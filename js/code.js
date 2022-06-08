const urlBase = 'http://rodenthub.com/LAMPAPI';
const extension = 'php';

class Contact
{
    firstName;
    lastName;
    email;
    phoneNum;
    id;
}

let userId = 0;
let firstName = "";
let lastName = "";
var currContact = new Contact();

function loadLogin()
{
    // Get references to the two forms of the launch page
    const frmLogin = document.querySelector("#frmLogin");
    const frmSignUp = document.querySelector("#frmSignUp");

    // When the Sign Up link is clicked, hide the Log In form
    document.querySelector("#lnkSignUp").addEventListener("click", e =>{
        e.preventDefault();
        frmLogin.classList.add("hidden");
        frmSignUp.classList.remove("hidden");

        document.getElementById("txtFirstName").value = "";
        document.getElementById("txtLastName").value = "";
        document.getElementById("txtSignInName").value = "";
        document.getElementById("txtSignInPassword").value = "";
        document.getElementById("txtConfirmedPassword").value = "";
        document.getElementById("errSignUp").innerHTML = "";
    });

    // When the Log In link is clicked, hide the Sign Up form
    document.querySelector("#lnkLogin").addEventListener("click", e =>{
        e.preventDefault();
        frmLogin.classList.remove("hidden");
        frmSignUp.classList.add("hidden");

        document.getElementById("txtUsername").value = "";
        document.getElementById("txtPassword").value = "";
        document.getElementById("errLogin").innerHTML = "";
    });
}

function setFormErrorMessage(error, message)
{
    error.innerHTML = message;
}

function doLogin()
{
    userId = 0;
    firstName = "";
    lastName = "";
    
    let login = document.getElementById("txtUsername").value;
    let password = document.getElementById("txtPassword").value;
    let errLogin = document.getElementById("errLogin");

    if(login == "")
    {
        setFormErrorMessage(errLogin, "Enter in a username");
    }
    else if(password == "")
    {
        setFormErrorMessage(errLogin, "Enter in a password");
    }
    else
    {
        let tmp = {login:login, password:password};
        let jsonPayload = JSON.stringify(tmp);

        let url = urlBase + '/Login.' + extension;

        let xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

        xhr.onreadystatechange = function() 
        {
            if(this.readyState == 4 && this.status == 200) 
            {                    
                let jsonObject = JSON.parse(xhr.responseText);
                userId = jsonObject.id;

                if(userId < 1)
                {		
                    setFormErrorMessage(errLogin, "User/Password combination incorrect");
                    return;
                }

                firstName = jsonObject.firstName;
                lastName = jsonObject.lastName;
    
                saveCookie();
                window.location.href = "menu.html";
            }
        };

        xhr.send(jsonPayload);
    }
}

function doLogout()
{
    userId = 0;
    firstName = "";
    lastName = "";
    document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = "index.html";
}

function doRegister()
{
    let username = document.getElementById("txtSignInName").value;
    let password = document.getElementById("txtSignInPassword").value;
    let confirmedPassword = document.getElementById("txtConfirmedPassword").value;
    let errSignUp = document.getElementById("errSignUp");

    firstName = document.getElementById("txtFirstName").value;
    lastName = document.getElementById("txtLastName").value;
    userId = 0;

    if(firstName == "")
    {
        setFormErrorMessage(errSignUp, "Enter your first name");
    }
    else if(lastName == "")
    {
        setFormErrorMessage(errSignUp, "Enter your last name");
    }
    else if(username == "")
    {
        setFormErrorMessage(errSignUp, "Enter a username");
    }
    else if(password == "")
    {
        setFormErrorMessage(errSignUp, "Enter a password");
    }
    else if(confirmedPassword == "")
    {
        setFormErrorMessage(errSignUp, "Confirm your password");
    }
    else if(confirmedPassword != password)
    {
        setFormErrorMessage(errSignUp, "Confirmed password does not match given password");
    }
    else
    {
        let tmp = {Login:username, FirstName:firstName, LastName:lastName, Password:confirmedPassword};
        let jsonPayload = JSON.stringify(tmp);

        let url = urlBase + '/Register.' + extension;

        let xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

        xhr.onreadystatechange = function() 
        {
            if(this.readyState == 4 && this.status == 200) 
            {                    
                let jsonObject = JSON.parse(xhr.responseText);
                userId = jsonObject.ID;
                
                if(userId == 0)
                {
                    setFormErrorMessage(errSignUp, "Username taken");
                    return;
                }

                alert("UserID = " + userId);
                saveCookie();
                window.location.href = "menu.html";
            }
        };

        xhr.send(jsonPayload);
    }
}

function saveCookie()
{
    let minutes = 20;
    let date = new Date();
    date.setTime(date.getTime()+(minutes*60*1000));	
    document.cookie = "firstName=" + firstName + ",lastName=" + lastName + 
                      ",userId=" + userId + ";expires=" + date.toGMTString();
}

function readCookie()
{
    userId = -1;
    let data = document.cookie;
    let splits = data.split(",");
    for(var i = 0; i < splits.length; i++) 
    {
        let thisOne = splits[i].trim();
        let tokens = thisOne.split("=");
        if(tokens[0] == "firstName")
        {
            firstName = tokens[1];
        }
        else if(tokens[0] == "lastName")
        {
            lastName = tokens[1];
        }
        else if(tokens[0] == "userId")
        {
            userId = parseInt(tokens[1].trim());
        }
    }

    if(userId < 0)
        window.location.href = "index.html";
    else
        document.getElementById("accountName").innerHTML = "Logged in as " + lastName + ", " + firstName;
}

function doSearch()
{
    const searchBar = document.querySelector("#searchBar");  
    const dlgContactInfo = document.querySelector("#dlgContactInfo");
    const frmResults = document.querySelector('#frmSearchResults');
    let query = document.getElementById("contactSearch").value;
    let errSearch = document.getElementById("errSearch");

    if(query != "")
    {
        // Make sure the contact info dialog is hidden
        dlgContactInfo.classList.add("hidden");

        // Clear the previous result list
        while(frmResults.hasChildNodes()) 
            frmResults.removeChild(frmResults.firstChild);

        let tmp = {search:query, userId:userId};
        let jsonPayload = JSON.stringify(tmp);

        let url = urlBase + '/SearchContacts.' + extension;
        
        let xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

        xhr.onreadystatechange = function() 
        {
            if (this.readyState == 4 && this.status == 200) 
            {
                let jsonObject = JSON.parse(xhr.responseText);

                if(jsonObject.error != "")
                {
                    setFormErrorMessage(errSearch, jsonObject.error);
                    return;
                }

                // Move search bar towards top of page
                searchBar.style.marginTop = "3%";

                // console.log(Object.keys(jsonObject));
                console.log(jsonObject.results);

                for(let i = 0; i < jsonObject.results.length; i++)
                {
                    // Create a text element for each result
                    const elem = document.createElement('p');

                    // Fill the element text with contact name
                    elem.innerHTML = jsonObject.results[i].Name;

                    // Apply CSS formatting
                    elem.classList.add("contactResult");

                    // Parse name into first name and last name
                    let nameSplit = jsonObject.results[i].Name.split(" ");

                    // Add a onclick() event that opens the contact info
                    elem.onclick = function() {
                        openContactInfo(nameSplit[0], nameSplit[1], 
                                        jsonObject.results[i].Email, 
                                        jsonObject.results[i].Phone, 
                                        jsonObject.results[i].ID);
                    };

                    // Add to the list of results
                    frmResults.appendChild(elem);

                    // Add a break for every entry
                    if(i < jsonObject.results.length)
                        frmResults.appendChild(document.createElement('br'));

                    //Clear any errors if there were any
                    errSearch.innerHTML = "";
                }
            }
        };
        xhr.send(jsonPayload);
    }       
}

function openContactInfo(contactFirstName, contactLastName, email, phone, ID)
{
    const dlgContactInfo = document.querySelector("#dlgContactInfo");

    // Show contact info form
    dlgContactInfo.classList.remove("hidden");

    // Cache current contact
    currContact.firstName = contactFirstName;
    currContact.lastName = contactLastName;
    currContact.email = email;
    currContact.phoneNum = phone;
    currContact.id = ID;

    //Display contact information in text boxes
    document.getElementById("txtContactFirstName").value = contactFirstName;
    document.getElementById("txtContactLastName").value = contactLastName;
    document.getElementById("txtEmail").value = email;
    document.getElementById("txtPhoneNum").value = phone;

    //Hide Add New Contact button so they can't open that dialog when this one is open
    document.getElementById("btnAddContact").style.display = "none";
}

function doDelete()
{
    let confirmedAction = confirm("Do you want to delete this contact?");

    if(confirmedAction)
    {
        let errInfo = document.getElementById("errInfo");
        let contactFirstName = document.getElementById("txtContactFirstName").value;
        let contactLastName = document.getElementById("txtContactLastName").value;
        let name = contactFirstName + " " + contactLastName;

        let tmp = {delete:name, ID:currContact.id};
        let jsonPayload = JSON.stringify(tmp);

        let url = urlBase + '/Delete.' + extension;

        let xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
        try
        {
            xhr.onreadystatechange = function() 
            {
                if(this.readyState == 4 && this.status == 200) 
                {                    
                    closeInfo();

                    const frmResults = document.querySelector('#frmSearchResults');

                    // Clear the previous result list
                    while(frmResults.hasChildNodes()) 
                        frmResults.removeChild(frmResults.firstChild);

                    //Set the search bar back to initial state
                    document.querySelector("#searchBar").style.marginTop = "19vw";
                    document.getElementById("contactSearch").value = "";
                }
            };

            xhr.send(jsonPayload);
        }
        catch(err)
        {
            setFormErrorMessage(errInfo, err.message);
        }    
    }
}

function doUpdate()
{
    let errInfo = document.getElementById("errInfo");
    let contactFirstName = document.getElementById("txtContactFirstName").value;
    let contactLastName = document.getElementById("txtContactLastName").value;
    let email = document.getElementById("txtEmail").value;
    let phoneNum = document.getElementById("txtPhoneNum").value; 
    let name = contactFirstName + " " + contactLastName;
    
    let tmp = {name:name, phone:phoneNum, email:email, ID:currContact.id};
    let jsonPayload = JSON.stringify(tmp);    

    let url = urlBase + '/EditContact.' + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try
    {
        xhr.onreadystatechange = function() 
        {
            if(this.readyState == 4 && this.status == 200) 
            {                    
                currContact.firstName = contactFirstName;
                currContact.lastName = contactLastName;
                currContact.email = email;
                currContact.phoneNum = phoneNum;
                console.log(currContact.id);
                closeInfo();

                const frmResults = document.querySelector('#frmSearchResults');

                // Clear the previous result list
                while(frmResults.hasChildNodes()) 
                    frmResults.removeChild(frmResults.firstChild);

                //Set the search bar back to initial state
                document.querySelector("#searchBar").style.marginTop = "19vw";
                document.getElementById("contactSearch").value = "";
            }
        };

        xhr.send(jsonPayload);
    }
    catch(err)
    {
        setFormErrorMessage(errInfo, err.message);
    }        
}

function closeInfo()
{
    document.getElementById("txtContactFirstName").value = "";
    document.getElementById("txtContactLastName").value = "";
    document.getElementById("txtEmail").value = "";
    document.getElementById("txtPhoneNum").value = "";

    //Hide dialog box
    const dlgContactInfo = document.querySelector("#dlgContactInfo");
    dlgContactInfo.classList.add("hidden");

    //Display Add New Contact button
    document.getElementById("btnAddContact").style.display = "initial";
}

function addContact()
{
    const dlgBox = document.querySelector("#dlgNewContact");
    dlgBox.classList.remove("hidden");
}

function doCreate()
{    
    let newFirstName = document.getElementById("txtNewContactFirstName").value;
    let newLastName = document.getElementById("txtNewContactLastName").value;
    let email = document.getElementById("txtNewEmail").value;
    let phoneNum = document.getElementById("txtNewPhoneNum").value; 
    let name = newFirstName + " " + newLastName;
    let errCreate = document.getElementById("errCreate");

    let tmp = {userId:userId, Name:name, Phone:phoneNum, Email:email};
    let jsonPayload = JSON.stringify(tmp);

    let url = urlBase + '/AddContacts.' + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try
    {
        xhr.onreadystatechange = function() 
        {
            if (this.readyState == 4 && this.status == 200)
                closeNewContact();
        };
        xhr.send(jsonPayload);
    }
    catch(err)
    {
        setFormErrorMessage(errCreate, err.message);
    }
}

function closeNewContact()
{
    const dlgBox = document.querySelector("#dlgNewContact");

    document.getElementById("txtNewContactFirstName").value = "";
    document.getElementById("txtNewContactLastName").value = "";
    document.getElementById("txtNewEmail").value = "";
    document.getElementById("txtNewPhoneNum").value = "";
    document.getElementById("txtNewPhoneNum").placeholder = "xxx-xxx-xxxx";

    dlgBox.classList.add("hidden");
}
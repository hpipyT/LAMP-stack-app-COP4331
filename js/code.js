const urlBase = 'http://rodenthub.com/LAMPAPI';
const extension = 'php';

class Contact
{
    firstName;
    lastName;
    email;
    phoneNum;
}

let userId = 0;
let firstName = "";
let lastName = "";

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
    let err = document.getElementById("errLogin");

    if(login == "")
    {
        setFormErrorMessage(err, "Enter in a username");
    }
    else if(password == "")
    {
        setFormErrorMessage(err, "Enter in a password");
    }
    else
    {
        // let tmp = {login:login, password:password};
        // let jsonPayload = JSON.stringify(tmp);

        // let url = urlBase + '/Login.' + extension;

        // let xhr = new XMLHttpRequest();
        // xhr.open("POST", url, true);
        // xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
        // try
        // {
        //     xhr.onreadystatechange = function() 
        //     {
        //         if(this.readyState == 4 && this.status == 200) 
        //         {
        //             let jsonObject = JSON.parse(xhr.responseText);
        //             alert('API endpoint connected with a payload of ' + jsonPayload);
        //             userId = jsonObject.id;

        //             if(userId < 1)
        //             {		
        //                 setFormErrorMessage(err, "User/Password combination incorrect");
        //                 return;
        //             }

        //             firstName = jsonObject.firstName;
        //             lastName = jsonObject.lastName;
        
        //             saveCookie();
        //             window.location.href = "menu.html";
        //         }
        //     };

        //     xhr.send(jsonPayload);
        // }
        // catch(err)
        // {
        //     setFormErrorMessage(err, err.message);
        // }

        // TODO: remove when endpoints work
        saveCookie();
        window.location.href = "menu.html";
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
    let err = document.getElementById("errSignUp");

    firstName = document.getElementById("txtFirstName").value;
    lastName = document.getElementById("txtLastName").value;
    userId = 1;

    if(firstName == "")
    {
        setFormErrorMessage(err, "Enter your first name");
    }
    else if(lastName == "")
    {
        setFormErrorMessage(err, "Enter your last name");
    }
    else if(username == "")
    {
        setFormErrorMessage(err, "Enter a username");
    }
    else if(password == "")
    {
        setFormErrorMessage(err, "Enter a password");
    }
    else if(confirmedPassword == "")
    {
        setFormErrorMessage(err, "Confirm your password");
    }
    else if(confirmedPassword != password)
    {
        setFormErrorMessage(err, "Confirmed password does not match given password");
    }
    else
    {
        // let tmp = {FirstName:firstName, LastName:lastName, Login:username, Password:confirmedPassword};
        // let jsonPayload = JSON.stringify(tmp);

        // let url = urlBase + '/Register.' + extension;

        // let xhr = new XMLHttpRequest();
        // xhr.open("POST", url, true);
        // xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
        // try
        // {
        //     xhr.onreadystatechange = function() 
        //     {
        //         if(this.readyState == 4 && this.status == 200) 
        //         {
        //             let jsonObject = JSON.parse(xhr.responseText);
        //             alert('API endpoint connected with a payload of ' + jsonPayload);

        //             //TODO: what's the logic here?

        //             firstName = jsonObject.firstName;
        //             lastName = jsonObject.lastName;
        
        //             saveCookie();
        //             window.location.href = "menu.html";
        //         }
        //     };

        //     xhr.send(jsonPayload);
        // }
        // catch(err)
        // {
        //     setFormErrorMessage(err, err.message);
        // }

        // TODO: remove when endpoints work
        saveCookie();
        window.location.href = "menu.html";
    }
}

function saveCookie()
{
    let minutes = 20;
    let date = new Date();
    date.setTime(date.getTime()+(minutes*60*1000));	
    document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
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
    {
        window.location.href = "index.html";
    }
    else
    {
        document.getElementById("accountName").innerHTML = "Logged in as " + lastName + ", " + firstName;
    }
}

function doSearch()
{
    const searchBar = document.querySelector("#searchBar");  
    const frmContactInfo = document.querySelector("#frmContactInfo");  
    let query = document.getElementById("contactSearch").value;
    let btnNewContact = document.querySelector("#btnAddContact");
    //test
    //let err = document.getElementById("errSearch");

    if(query != "")
    {
        // Make sure the contact info form is hidden
        frmContactInfo.classList.add("hidden");
        
        let contactsList = ""

        //TODO: what is the API expecting
        // let jsonPayload = JSON.stringify(tmp);

        //TODO: is this right API?
        // let url = urlBase + '/Search.' + extension;
        
        // let xhr = new XMLHttpRequest();
        // xhr.open("POST", url, true);
        // xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
        // try
        // {
        //     xhr.onreadystatechange = function() 
        //     {
        //         if (this.readyState == 4 && this.status == 200) 
        //         {
        //             // Move search bar towards top of page
        //             searchBar.style.marginTop = "3%";

        //             let jsonObject = JSON.parse( xhr.responseText );

        //             for( let i=0; i<jsonObject.results.length; i++ )
        //             {
        //                 contactsList += jsonObject.results[i];
        //                 if( i < jsonObject.results.length - 1 )
        //                 {
        //                     contactsList += "<br />\r\n";
        //                 }
        //             }

        //             document.getElementById("resultList").innerHTML = contactsList;

        //             // Show add new contacts button
        //             btnNewContact.classList.remove("hiddenButton");
        //         }
        //     };
        //     xhr.send(jsonPayload);
        // }
        //
        // catch(err)
        // {
        //     //TODO: currently don't have an indicator
        // }

        // TODO: remove remaining code when endpoints work
        // Move search bar towards top of page
        searchBar.style.marginTop = "3%";

        contactsList += query + "<br />\r\n";

        document.getElementById("resultList").innerHTML = contactsList;

        // Show add new contacts button
        btnNewContact.classList.remove("hiddenButton");
    }       
}

function openContactInfo()
{
    const frmContactInfo = document.querySelector("#frmContactInfo");
    let contact = new Contact();
    contact.firstName = "Chris";
    contact.lastName = "Beltran";
    contact.email = "email@gmail.com";
    contact.phoneNum = "555-555-5555";

    // Show contact info form
    frmContactInfo.classList.remove("hidden");

    document.getElementById("txtContactFirstName").setAttribute('value', contact.firstName);
    document.getElementById("txtContactLastName").setAttribute('value', contact.lastName);
    document.getElementById("txtEmail").setAttribute('value', contact.email);
    document.getElementById("txtPhoneNum").setAttribute('value', contact.phoneNum);    
}

function doEdit()
{
    var txtContactInfo = document.getElementsByClassName("txtContactInfo");
    let btnUpdate = document.querySelector("#btnUpdate");
    let btnCancel = document.querySelector("#btnCancelEdit");

    // Make the contact info fields editable
    for(let i = 0; i < txtContactInfo.length; i++)
    {
        txtContactInfo[i].style.background="white";
        txtContactInfo[i].style.border="solid";
        txtContactInfo[i].readOnly = false;
    }
    
    // Show the update and cancel buttons
    btnUpdate.classList.remove("hiddenButton");
    btnCancel.classList.remove("hiddenButton");
}

function doDelete()
{
    const frmContactInfo = document.querySelector("#frmContactInfo");
    alert("Delete contacts");

    // Hide the contact info after a deletion
    frmContactInfo.classList.add("hidden");
}

function doUpdate()
{
    // let firstName = document.getElementById("txtContactFirstName").value;
    // let lastName = document.getElementById("txtContactLastName").value;
    // let email = document.getElementById("txtEmail").value;
    // let phoneNum = document.getElementById("txtPhoneNum").value; 
    // let name = firstName + " " + lastName;
    
    // let tmp = {Name:name, Phone:phoneNum, Email:email};
	// let jsonPayload = JSON.stringify(tmp);
    
    //test
    //let err = document.getElementById("errUpdate");

    // let url = urlBase + '/Edit.' + extension;
	
	// let xhr = new XMLHttpRequest();
	// xhr.open("POST", url, true);
	// xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	// try
	// {
	// 	xhr.onreadystatechange = function() 
	// 	{
	// 		if (this.readyState == 4 && this.status == 200) 
	// 		{
	// 			finishEdit();
	// 		}
	// 	};
	// 	xhr.send(jsonPayload);
	// }
	// catch(err)
	// {
	// 	//TODO: currently don't have a label for errors about this
	// }

    // TODO: remove when endpoints work
    finishEdit();
}

function cancelUpdate()
{
    //TODO: don't accept changes before finishing edit

    finishEdit();
}

function finishEdit()
{
    var txtContactInfo = document.getElementsByClassName("txtContactInfo");
    let btnUpdate = document.querySelector("#btnUpdate");
    let btnCancel = document.querySelector("#btnCancelEdit");

    // Make the contact info fields not editable
    for(let i = 0; i < txtContactInfo.length; i++)
    {
        txtContactInfo[i].style.background="none";
        txtContactInfo[i].style.border="0";
        txtContactInfo[i].readOnly = true;
    }   
    
    // Hide the update and cancel buttons
    btnUpdate.classList.add("hiddenButton");
    btnCancel.classList.add("hiddenButton");
}

function addContact()
{
    const dlgBox = document.querySelector("#dlgNewContact");
    dlgBox.classList.remove("hidden");
}

function doCreate()
{    
    // let firstName = document.getElementById("txtNewContactFirstName").value;
    // let lastName = document.getElementById("txtNewContactLastName").value;
    // let email = document.getElementById("txtNewEmail").value;
    // let phoneNum = document.getElementById("txtNewPhoneNum").value; 
    // let name = firstName + " " + lastName;
    //let err = document.getElementById("errCreate");

    // let tmp = {userId:userId, Name:name, Phone:phoneNum, Email:email};
    // let jsonPayload = JSON.stringify(tmp);

    // let url = urlBase + '/AddContacts.' + extension;

    // let xhr = new XMLHttpRequest();
    // xhr.open("POST", url, true);
    // xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    // try
    // {
    //     xhr.onreadystatechange = function() 
    //     {
    //         if (this.readyState == 4 && this.status == 200) 
    //         {
    //             finishCreate();
    //         }
    //     };
    //     xhr.send(jsonPayload);
    // }
    // catch(err)
    // {
    //     //TODO: currently don't have a label for errors about this
    // }

    // TODO: remove when endpoints work
    finishCreate();
}

function finishCreate()
{
    const dlgBox = document.querySelector("#dlgNewContact");

    document.getElementById("txtNewContactFirstName").value = "";
    document.getElementById("txtNewContactLastName").value = "";
    document.getElementById("txtNewEmail").value = "";
    document.getElementById("txtNewPhoneNum").value = "";
    document.getElementById("txtNewPhoneNum").placeholder = "xxx-xxx-xxxx";

    dlgBox.classList.add("hidden");
}
// TODO: 
// Do a dialogue box to show the search results
// look into jquery and bootstrap
// be done by the end of next week

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
        frmLogin.classList.add("hiddenForm");
        frmSignUp.classList.remove("hiddenForm");

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
        frmLogin.classList.remove("hiddenForm");
        frmSignUp.classList.add("hiddenForm");

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
    
    let loginName = document.getElementById("txtUsername").value;
    let password = document.getElementById("txtPassword").value;
    let err = document.getElementById("errLogin");

    if (loginName == "")
        setFormErrorMessage(err, "Enter in a username");
    else if (password == "")
        setFormErrorMessage(err, "Enter in a password");

	alert("Username: " + loginName + "\nPassword: " + password);
    window.location.href = "menu.html";
}

function doLogout()
{
    userId = 0;
    firstName = "";
    lastName = "";	
    window.location.href = "index.html";
}

function createAccount()
{
    let username = document.getElementById("txtSignInName").value;
    let password = document.getElementById("txtSignInPassword").value;
    let confirmedPassword = document.getElementById("txtConfirmedPassword").value;
    let err = document.getElementById("errSignUp");

    firstName = document.getElementById("txtFirstName").value;
    lastName = document.getElementById("txtLastName").value;
    userId = 1;

    if (firstName == "")
        setFormErrorMessage(err, "Enter your first name");
    else if (lastName == "")
        setFormErrorMessage(err, "Enter your last name");
    else if (username == "")
        setFormErrorMessage(err, "Enter a username");
    else if (password == "")
        setFormErrorMessage(err, "Enter a password");
    else if (confirmedPassword == "")
        setFormErrorMessage(err, "Confirm your password");
    else if (confirmedPassword != password)
        setFormErrorMessage(err, "Confirmed password does not match given password");
    else
        alert("Username: " + username + "\nPassword: " + password)
    
    saveCookie();
    window.location.href = "menu.html";
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
        document.getElementById("userName").innerHTML = "Logged in as " + firstName + " " + lastName;
    }
}
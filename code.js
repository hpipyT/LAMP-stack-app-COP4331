// TODO: 
// Do a dialogue box to show the search results
// jquery and bootstrap
// logout
// be done by the end of next week

// Upon page being loaded
document.addEventListener("DOMContentLoaded", ()=> {

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
});

function setFormErrorMessage(error, message)
{
    error.innerHTML = message;
}

function doLogin()
{
    let loginName = document.getElementById("txtUsername").value;
    let password = document.getElementById("txtPassword").value;
    let err = document.getElementById("errLogin");

    if (loginName == "")
        setFormErrorMessage(err, "Enter in a username");
    else if (password == "")
        setFormErrorMessage(err, "Enter in a password");

	alert("Username: " + loginName + "\nPassword: " + password);
}

function createAccount()
{
    let firstName = document.getElementById("txtFirstName").value;
    let lastName = document.getElementById("txtLastName").value;
    let username = document.getElementById("txtSignInName").value;
    let password = document.getElementById("txtSignInPassword").value;
    let confirmedPassword = document.getElementById("txtConfirmedPassword").value;
    let err = document.getElementById("errSignUp");

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

    //proceed inside
}
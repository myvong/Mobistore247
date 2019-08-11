function validateRegister() {
    var email = document.getElementById("txtemail");
    var re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!re.test(email.value)) {
        window.alert("Please enter your valid email."); 
        email.focus(); 
        return false; 
    } 
    var phonenumber = document.getElementById("txtphonenumber");
    re = /^[0-9]{10,11}$/;
    if (!re.test(phonenumber.value)) {
        window.alert("Please enter your valid phone number");
        phonenumber.focus();
        return false;
    }
    var pwd = document.getElementById("txtpassword");
    re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!re.test(pwd.value)) {
        window.alert("Your password must have at least 8 characters and contain at least one lowercase, one uppercase and one digit");
        pwd.focus();
        return false;
    }

    var confirmpwd = document.getElementById("txtconfirmpassword");
    if (pwd.value != confirmpwd.value) {
        window.alert("Password mismatch");
        confirmpwd.focus();
        return false;
    }

    var username = document.getElementById("txtusername");
    var fullname = document.getElementById("txtfullname");

    const textInput = document.getElementById('album_id');
    const artistName = textInput.value;
    url = "/register";
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8' ,
            'Accept': 'application/json'
        },
        body: {
            "username": username.value,
            "fullname": fullname.value,
            "email": email.value,
            "phonenumber": phonenumber.value,
            "password": pwd.value
        }
    }).then(onResponse)
        .then(onJsonReady);
    event.preventDefault();
    return false;
}

function setQuantity(ops) {
    var quantity = document.getElementById("quantity");
    if (ops == 'up') {
        quantity.value++;
    }
    else if (ops == 'down') {
        if (quantity.value > 1) {
            quantity.value--;
        }
    }
}

function onResponse(response){
    return response.json();
}

function onJsonReady(json){
    alert(json.message);
    return true;
}

async function postComment(event, productId) {
    console.log(productId);
    return false;
    event.preventDefault();
    var username = document.getElementById("input-name").value;
    var commentContent = document.getElementById("txt-editor").value;
    if (!username) {
        return false;
    }
    if (!commentContent) {
        return false;
    }
    var productId = document.getElementById
}
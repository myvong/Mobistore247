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

function formatTime(time) {
    datetime = new Date(time)
    return  datetime.getDate() + "/" + 
            (datetime.getMonth() + 1) + "/" +
            datetime.getFullYear() + " " +
            datetime.getHours() + ":" +
            datetime.getMinutes() + ":" +
            datetime.getSeconds()
}

async function postComment(event) {
    event.preventDefault();
    var pid = document.URL.substring(document.URL.lastIndexOf('/') + 1);
    var username = document.getElementById("input-name");
    var commentContent = document.getElementById("txt-editor");
    const result = await fetch('http://localhost:3000/comment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            product_id: pid,
            username: username.value,
            comment: commentContent.value,
            status: 1 
        })
    });
    username.value = '';
    commentContent.value = '';
    const message = await result.text();
    if (result.status == 201) {
        const result = await fetch('http://localhost:3000/comment?pid=' + pid);
        if (result.status != 200) {
            return;
        }
        const comments = await result.json();
        const commentList = document.getElementById('list-comment');
        const totalComments = document.getElementById('total-comment');
        totalComments.innerHTML = comments.length + " bình luận";
        commentList.innerHTML='';
        for (comment of comments) {
            var li = document.createElement("li");
            li.setAttribute("class", "comment");
            
            var divNode = document.createElement("div");
            divNode.setAttribute("class", "comment-username");
            divNode.textContent = comment.username;
            li.appendChild(divNode);

            divNode = document.createElement("div");
            divNode.setAttribute("class", "comment-content");
            divNode.textContent = comment.comment;
            li.appendChild(divNode);

            divNode = document.createElement("div");
            divNode.setAttribute("class", "comment-time");
            divNode.textContent = formatTime(comment.createdAt);
            li.appendChild(divNode);

            commentList.appendChild(li);
        }
    }
    else {
        alert(message);
    }
    return false;
}
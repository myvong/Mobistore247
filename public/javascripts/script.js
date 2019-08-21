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

function setQuantity(quantity, ops) {
    if (ops == 'up') {
        quantity.value++;
    }
    else if (ops == 'down') {
        if (quantity.value > 1) {
            quantity.value--;
        }
    }
    return false;
}

function indexOf(items, id) {
    for (var i = 0; i < items.length; i++) {
        if (items[i].id == id)
            return i;
    }
    return -1;
}

$(document).on('click', "#quantity-up", function (event) {
    event.preventDefault();
    let quantity = $(this).parent();
    quantity = quantity.parent();

    if (location.pathname == '/checkout') {
        let itemId = quantity.parent().parent()[0].id;
        let cart = JSON.parse(localStorage.getItem('cart'));
        const idx = indexOf(cart.items, itemId);
        if (idx != -1) {
            cart.items[idx].quantity++;
            cart.totalItems++;
            cart.totalAmount += cart.items[idx].price;
        }
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    quantity = quantity[0].querySelector('#quantity');
    return setQuantity(quantity, 'up');
});

$(document).on('click', "#quantity-dwn", function (event) {
    event.preventDefault();
    let quantity = $(this).parent();
    quantity = quantity.parent();

    if (location.pathname == '/checkout') {
        let itemId = quantity.parent().parent()[0].id;
        let cart = JSON.parse(localStorage.getItem('cart'));
        const idx = indexOf(cart.items, itemId);
        if (idx != -1 && cart.items[idx].quantity > 1) {
            cart.items[idx].quantity--;
            cart.totalItems--;
            cart.totalAmount -= cart.items[idx].price;
        }
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    quantity = quantity[0].querySelector('#quantity');

    return setQuantity(quantity, 'down');
});

$(document).on('click', '#delete-item', function (event) {
    event.preventDefault();
    let item = $(this).parent()[0];
    let cart = JSON.parse(localStorage.getItem('cart'));
    if (cart) {
        const idx = indexOf(cart.items, item.id);
        console.log(idx);
        console.log(item.id);
        if (idx != -1) {
            cart.items.splice(idx, 1);
            console.log(cart);
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }
    item.remove();
    return false;
})

$(document).on('click', "#cancel", function (event) {
    event.preventDefault();
    localStorage.removeItem("cart");
    document.querySelector("#cart-detail").remove();
    location.reload(true);
})

$(document).on('click', "#btn-cart-cancel", function (event) {
    event.preventDefault();
    localStorage.removeItem("cart");
    document.querySelector("#cart-detail").remove();
    location.reload(true);
})

$(document).on('click', "#btn-cart-checkout", async function (event) {
    event.preventDefault();
    const result = await fetch('/checkout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: localStorage.getItem('cart')
    });
    if (result.status == 201) {
        alert('Bạn đã đặt hàng thành công');
        localStorage.removeItem('cart');
        location.replace('/');
    }
    else {
        alert('Đã xảy ra lỗi, vui lòng thử lại');
    }
})

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
    const result = await fetch('/comment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            productId: pid,
            username: username.value,
            comment: commentContent.value,
            status: 1 
        })
    });
    username.value = '';
    commentContent.value = '';
    const message = await result.text();
    if (result.status == 201) {
        const result = await fetch('/comment?pid=' + pid);
        if (result.status != 200) {
            return;
        }
        const comments = await result.json();
        const commentList = document.getElementById('list-comment');
        const totalComments = document.getElementById('total-comment');
        totalComments.innerHTML = comments.length + " bÃ¬nh luáº­n";
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

function addCart(event) {
    event.preventDefault();
    const pathnames = location.pathname.split('/');
    const id = pathnames[pathnames.length - 1];
    const title = document.getElementById('product-name').innerText;
    const quantity = parseInt(document.getElementById("quantity").value);
    let price = document.getElementById("price");
    price = parseInt(price.innerText.substr(0, price.innerText.length - 1)) || 0;
    let cart = JSON.parse(localStorage.getItem('cart')) || {
        items: [],
        totalAmount: 0,
        totalItems: 0
    };
    const idx = indexOf(cart.items, id);
    if (idx != -1) {
        cart.totalItems += quantity;
        cart.totalAmount += quantity * cart.items[idx].price;
        cart.items[idx].quantity += quantity;
    }
    else {
        cart.items.push({
            id: id,
            title: title,
            quantity: quantity,
            price: price
        })
        cart.totalItems += quantity;
        cart.totalAmount += quantity * price;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    document.getElementById('totalItems').innerText = cart.totalItems;

    return false;
}

window.onload = function () {
    console.log(document.readyState);
    var cart = JSON.parse(localStorage.getItem('cart'));
    var cartTitle = document.querySelector('#cart-title');
    if (cart == null || cart.totalItems == 0) {
        cartTitle.innerText = "Giỏ hàng không có sản phẩm, vui lòng chọn sản phẩm trước khi đặt hàng";
        return;
    }
    else {
        cartTitle.innerText = "GIỎ HÀNG (" + cart.totalItems + " sản phẩm)"
    }
    var shoppingCart = document.querySelector('#cart-detail');
    var cartItem = document.querySelector('#template-cart-item');
    // console.log(cartItem);
    for (var i = 0; i < cart.items.length; i++) {
        cartItem.content.querySelector('.shopping-cart-item').id = cart.items[i].id;
        cartItem.content.querySelector('#product-name').innerText = cart.items[i].title;
        cartItem.content.querySelector('#product-price').innerText = cart.items[i].price + '₫';
        cartItem.content.querySelector('#quantity').setAttribute('value', cart.items[i].quantity);

        var cloneItem = document.importNode(cartItem.content, true);
        shoppingCart.appendChild(cloneItem);
    }
    shoppingCart.innerHTML += '<hr />';

    var row = document.createElement("div");
    row.setAttribute("class", "row mb-2");
    var amountTitle = document.createElement("div");
    amountTitle.setAttribute("class", "col-md-2 offset-md-8");
    amountTitle.setAttribute("style", "font-weight: bold;");
    amountTitle.innerText = "Tổng tiền: ";
    var totalAmount = document.createElement("div");
    totalAmount.setAttribute("class", "col-md-1 text-right");
    totalAmount.setAttribute("style", "font-size: 20px; color: red");
    totalAmount.innerText = cart.totalAmount;
    row.appendChild(amountTitle);
    row.appendChild(totalAmount);
    shoppingCart.appendChild(row);

    row = document.createElement("div");
    row.setAttribute("class", "row");
    var btnCheckout = document.createElement("button");
    btnCheckout.setAttribute("id", "btn-cart-checkout");
    btnCheckout.setAttribute("class", "btn btn-success col-md-1 offset-md-9");
    btnCheckout.innerText = "Đặt hàng";
    var btnCancel = document.createElement("button");
    btnCancel.setAttribute("id", "btn-cart-cancel");
    btnCancel.setAttribute("class", "btn btn-danger col-md-1 float-rght ml-md-1");
    btnCancel.innerText = "Hủy";

    row.appendChild(btnCheckout);
    row.appendChild(btnCancel);
    shoppingCart.appendChild(row);
    // shoppingCart.appendChild(new Node());
}
const products = [
    {
        name: 'Colorful-T-shirt',
        tag: 'Colorful-T-shirt',
        price: 15,
        inCart: 0
    },
    {
        name: 'Blue-T-shirt',
        tag: 'Blue-T-shirt',
        price: 10,
        inCart: 0
    },
    {
        name: 'Black-T-shirt',
        tag: 'Black-T-shirt',
        price: 20,
        inCart: 0
    },
    {
        name: 'White-T-shirt',
        tag: 'white-T-shirt',
        price: 15,
        inCart: 0
    }
];

let carts = document.querySelectorAll('.add-cart');
for (let item = 0; item < carts.length; item++) {
    carts[item].addEventListener('click', () => {
        cartNumbers(products[item]);
        totalCost(products[item]);
    });
}

const onLoadCartNumbers = () => {
    let productNumbers = localStorage.getItem('cartNumbers');
    if (!productNumbers) {
        document.querySelector('.cart span').textContent = 0;

    } else {
        document.querySelector('.cart span').textContent = productNumbers;
    }
};

const cartNumbers = (product) => {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = +productNumbers;

    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    }
    else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }

    setItems(product);
};
const setItems = (product) => {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {
        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            };
        }
        cartItems[product.tag].inCart += 1;
    }
    else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        };
    }
    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
};
const totalCost = (product) => {
    let cartCost = localStorage.getItem('totalCost');
    if (cartCost != null) {
        cartCost = +cartCost;
        localStorage.setItem('totalCost', cartCost + product.price);

    }
    else {
        localStorage.setItem('totalCost', product.price);
    }
};


const displayCart = () => {
    let cartItems = JSON.parse(localStorage.getItem('productsInCart'));
    let productContainer = document.querySelector('.products');
    let cartCost = localStorage.getItem('totalCost');

    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class='product'>
                  <ion-icon id='delete' name="close-circle" onClick='deleteItem(${item.inCart})'></ion-icon>
                  <img src='./images/${item.tag}.jpg'>
                  <span>${item.name}</span>
            </div>           

            <div class='price'>$${item.price}</div>

            <div class='quantity'>
                <ion-icon class='decrease' 
                name="arrow-dropleft-circle"></ion-icon>
                <span>${item.inCart}</span>
                <ion-icon class='increase' 
                name="arrow-dropright-circle"></ion-icon>
            </div>

            <div class='total'>
                    $${item.inCart * item.price},00
            </div>
            `;
        });
        productContainer.innerHTML += `
        <div class='basketTotalContainer'>
                <h4 class='basketTotalTitle'>Basket Total </h4>
                <h4 class='basketTotal'>$${cartCost},00</h4>
        </div> 
        `;
    }
};
const deleteItem = (total) => {

    if (total >= 0) {
        let deleteChange = +document.querySelector('.decrease+span').textContent;
        document.querySelector('.decrease+span').textContent = deleteChange - 1;
    }

};
onLoadCartNumbers();
displayCart();
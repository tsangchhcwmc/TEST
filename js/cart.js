const products = [
    { id: 'drawing-book', name: '畫簿', price: 20, image: 'drawing_book.jpg' },
    { id: 'pencil', name: '鉛筆', price: 9, image: 'pencil.jpg' },
    { id: 'highlighter-pen', name: '螢光筆', price: 15, image: 'highlighter_pen.jpg' },
    { id: 'color-pen', name: '七彩原子筆', price: 17, image: 'color_pen.jpg' },
    { id: 'eraser', name: '膠擦', price: 8, image: 'eraser.jpg' },
    { id: 'eraser-pen', name: '擦膠筆', price: 15, image: 'eraser_pen.jpg' },
    { id: 'ruler', name: '間尺', price: 9, image: 'ruler.jpg' }
];

function generateProductHTML() {
    const productContainer = document.getElementById('product-container');
    let html = '';
    
    products.forEach(product => {
        html += `
        <div class="col">
            <div class="card">
                <h3 class="card-title" style="background-color: bisque">${product.name} $${product.price}</h3>
                <div class="image-container">
                    <img src="images/${product.image}" alt="${product.name}" class="card-img">
                </div>
                <div class="card-body text-center">
                    <div class="quantity-control d-flex align-items-center">
                        <span style="flex: 3; text-align: left;">數量</span>
                        <button class="btn btn-primary btn-sm" style="flex: 1;" onclick="decreaseQuantity('${product.id}')">-</button>
                        <span id="${product.id}-qty" class="quantity-display" style="flex: 3; text-align: center;">0</span>
                        <button class="btn btn-primary btn-sm" style="flex: 1;" onclick="increaseQuantity('${product.id}')">+</button>
                    </div>
                </div>
            </div>
        </div>`;
    });

    productContainer.innerHTML = html;
}

function increaseQuantity(product) {
    let qty = document.getElementById(product + '-qty');
    qty.innerText = parseInt(qty.innerText) + 1; // Change from qty.value to qty.innerText
    updateTotal();
}

function decreaseQuantity(product) {
    let qty = document.getElementById(product + '-qty');
    if (parseInt(qty.innerText) > 0) { // Change from qty.value to qty.innerText
        qty.innerText = parseInt(qty.innerText) - 1; // Change from qty.value to qty.innerText
    }
    updateTotal();
}

function updateTotal() {
    let total = 0;
    products.forEach(product => { // Use products array instead of prices object
        let qty = parseInt(document.getElementById(product.id + '-qty').innerText); // Change from value to innerText
        total += qty * product.price; // Use product price directly
    });
    document.getElementById('total').innerText = total; // Update total display
    
    let remainder = total;
    let coins = 0;
    const coinsContainer = document.getElementById('coins-container');
    let html = '';
    while (remainder > 0) {
        if (remainder >= 10) { coins = 10 } else
        if (remainder >= 5) { coins = 5 } else
        if (remainder >= 2) { coins = 2 } else
        if (remainder >= 1) { coins = 1 };
        html += `
        <div class="col">
            <img src="images/dollar_${coins}.jpg" class="img-fluid" alt="dollar_${coins}"></img>
        </div>`;
        remainder -= coins;
    }
    coinsContainer.hidden = (total > 0) ? false : true;
    coinsContainer.innerHTML = html;    
}

function reset() {
    products.forEach(product => { // Use products array instead of prices object
        let qty = document.getElementById(product.id + '-qty');
        qty.innerText = 0;
    });
    updateTotal();
}

generateProductHTML();

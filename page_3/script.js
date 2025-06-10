// Fast Food Menu Data
const menu = {
    burgers: [
        { name: "Classic Burger", desc: "Juicy beef patty, lettuce, tomato, cheese, and our special sauce.", price: 5.99, img: "images/burger1.jpg" },
        { name: "Chicken Burger", desc: "Crispy chicken fillet, pickles, and creamy mayo.", price: 6.49, img: "images/burger2.jpg" },
        { name: "Veggie Burger", desc: "Grilled veggie patty, fresh greens, and avocado spread.", price: 5.49, img: "images/burger3.jpg" }
    ],
    sides: [
        { name: "French Fries", desc: "Golden, crispy fries with a pinch of sea salt.", price: 2.49, img: "images/fries.jpg" },
        { name: "Onion Rings", desc: "Crispy battered onion rings.", price: 2.99, img: "images/onionrings.jpg" }
    ],
    drinks: [
        { name: "Cola", desc: "Chilled classic cola.", price: 1.99, img: "images/cola.jpg" },
        { name: "Milkshake", desc: "Creamy vanilla milkshake.", price: 2.99, img: "images/milkshake.jpg" }
    ],
    desserts: [
        { name: "Ice Cream", desc: "Vanilla ice cream scoop.", price: 1.99, img: "images/icecream.jpg" },
        { name: "Apple Pie", desc: "Warm apple pie slice.", price: 2.49, img: "images/applepie.jpg" }
    ]
};

// Render Menu Items
document.addEventListener('DOMContentLoaded', () => {
    for (const section in menu) {
        const list = document.getElementById(section + '-list');
        menu[section].forEach((item, idx) => {
            const div = document.createElement('div');
            div.className = 'menu-item';
            div.innerHTML = `
                <img src="${item.img}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>${item.desc}</p>
                <div class="price">$${item.price.toFixed(2)}</div>
                <button data-section="${section}" data-idx="${idx}">Add to Cart</button>
            `;
            list.appendChild(div);
        });
    }

    // Cart functionality
    const cart = [];
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    document.body.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON' && e.target.textContent === 'Add to Cart') {
            const section = e.target.getAttribute('data-section');
            const idx = e.target.getAttribute('data-idx');
            const item = menu[section][idx];
            cart.push(item);
            renderCart();
        }
    });

    function renderCart() {
        cartItems.innerHTML = '';
        let total = 0;
        cart.forEach((item, i) => {
            total += item.price;
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${item.name}</span>
                <span>$${item.price.toFixed(2)}</span>
            `;
            cartItems.appendChild(li);
        });
        cartTotal.textContent = `Total: $${total.toFixed(2)}`;
    }
});

"use strict";
// Пошук товару за id
const findProduct = (products, id) => {
    return products.find(product => product.id === id);
};
// Фільтрація товарів за максимальною ціною
const filterByPrice = (products, maxPrice) => {
    return products.filter(product => product.price <= maxPrice);
};
// Додавання товару в кошик
const addToCart = (cart, product, quantity) => {
    if (quantity <= 0) {
        console.warn("Вкажіть кількість товарів більшу за 0");
        return cart;
    }
    const existingItemIndex = cart.findIndex(item => item.product.id === product.id);
    if (existingItemIndex !== -1) {
        // Якщо товар вже є в кошику, оновлюємо його кількість
        cart[existingItemIndex].quantity += quantity;
    }
    else {
        // Додаємо новий товар до кошика
        cart.push({ product, quantity });
    }
    return cart;
};
// Розрахунок загальної вартості товарів у кошику
const calculateTotal = (cart) => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
};
// Тестові дані
const electronics = [
    {
        id: 1,
        name: "Смартфон",
        price: 10000,
        category: 'electronics',
        brand: 'Nothing Phone',
        warranty: 24
    }
];
const clothing = [
    {
        id: 2,
        name: "Штани",
        price: 40,
        category: 'clothing',
        size: 'M',
        material: 'Cotton'
    }
];
const books = [
    {
        id: 3,
        name: "Гайд по користуванню чайником",
        price: 300,
        category: 'book',
        author: 'Xandor Kovalley',
        pages: 350
    }
];
// Тестування функцій
const allProducts = [...electronics, ...clothing, ...books];
// Пошук товару за id
const foundProduct = findProduct(allProducts, 1);
console.log("Знайдений товар:", foundProduct);
// Фільтрація товарів за максимальною ціною
const affordableProducts = filterByPrice(allProducts, 1000);
console.log("Доступні товари:", affordableProducts);
// Робота з кошиком
let cart = [];
if (foundProduct) {
    cart = addToCart(cart, foundProduct, 2);
    console.log("Кошик після додавання товару:", cart);
}
const totalPrice = calculateTotal(cart);
console.log("Загальна вартість кошика:", totalPrice);

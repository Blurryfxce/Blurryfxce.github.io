// Базовий тип товару
type BaseProduct = {
    id: number;
    name: string;
    price: number;
    description?: string;
};

type Electronics = BaseProduct & {
    category: 'electronics';
    brand: string;
    warranty: number;
};

type Clothing = BaseProduct & {
    category: 'clothing';
    size: 'S' | 'M' | 'L' | 'XL';
    material: string;
};

type Book = BaseProduct & {
    category: 'book';
    author: string;
    pages: number;
};

type Product = Electronics | Clothing | Book;


// Пошук товару за id
const findProduct = <T extends BaseProduct>(products: T[], id: number): T | undefined => {
    return products.find(product => product.id === id);
};

// Фільтрація товарів за максимальною ціною
const filterByPrice = <T extends BaseProduct>(products: T[], maxPrice: number): T[] => {
    return products.filter(product => product.price <= maxPrice);
};

// Тип для елемента кошика
type CartItem<T> = {
    product: T;
    quantity: number;
};

// Додавання товару в кошик
const addToCart = <T extends BaseProduct>(
    cart: CartItem<T>[],
    product: T,
    quantity: number
): CartItem<T>[] => {
    if (quantity <= 0) {
        console.warn("Вкажіть кількість товарів більшу за 0");
        return cart;
    }

    const existingItemIndex = cart.findIndex(item => item.product.id === product.id);
    
    if (existingItemIndex !== -1) {
        // Якщо товар вже є в кошику, оновлюємо його кількість
        cart[existingItemIndex].quantity += quantity;
    } else {
        // Додаємо новий товар до кошика
        cart.push({ product, quantity });
    }

    return cart;
};

// Розрахунок загальної вартості товарів у кошику
const calculateTotal = <T extends BaseProduct>(cart: CartItem<T>[]): number => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
};

// Тестові дані
const electronics: Electronics[] = [
    {
        id: 1,
        name: "Смартфон",
        price: 10000,
        category: 'electronics',
        brand: 'Nothing Phone',
        warranty: 24
    }
];

const clothing: Clothing[] = [
    {
        id: 2,
        name: "Штани",
        price: 40,
        category: 'clothing',
        size: 'M',
        material: 'Cotton'
    }
];

const books: Book[] = [
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
const allProducts: Product[] = [...electronics, ...clothing, ...books];

// Пошук товару за id
const foundProduct = findProduct(allProducts, 1);
console.log("Знайдений товар:", foundProduct);

// Фільтрація товарів за максимальною ціною
const affordableProducts = filterByPrice(allProducts, 1000);
console.log("Доступні товари:", affordableProducts);

// Робота з кошиком
let cart: CartItem<Product>[] = [];
if (foundProduct) {
    cart = addToCart(cart, foundProduct, 2);
    console.log("Кошик після додавання товару:", cart);
}

const totalPrice = calculateTotal(cart);
console.log("Загальна вартість кошика:", totalPrice);

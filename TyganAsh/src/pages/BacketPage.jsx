import { useState, useEffect } from 'react';
import Product from '../components/Product';
import { Link } from 'react-router-dom';

const BasketPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart')) || {};
        const items = Object.values(cart);
        setCartItems(items);
        const total = items.reduce((sum, item) => sum + (item.cost * item.count), 0);
        setTotalPrice(total);
    }, []);

    const updateCart = (updatedCart) => {
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        const items = Object.values(updatedCart);
        setCartItems(items);
        const total = items.reduce((sum, item) => sum + (item.cost * item.count), 0);
        setTotalPrice(total);
    };

    const handleIncrease = (productId) => {
        const cart = JSON.parse(localStorage.getItem('cart')) || {};
        cart[productId].count += 1;
        updateCart(cart);
    };

    const handleDecrease = (productId) => {
        const cart = JSON.parse(localStorage.getItem('cart')) || {};
        if (cart[productId].count > 1) {
            cart[productId].count -= 1;
        } else {
            delete cart[productId];
        }
        updateCart(cart);
    };

    const basketButtons = (productId) => [
        {
            type: "button",
            styles: "basket-button",
            path: () => handleDecrease(productId),
            text: "-"
        },
        {
            type: "button",
            styles: "basket-button",
            path: () => handleIncrease(productId),
            text: "+"
        }
    ];

    return (
        <div className="basket-container container">
            <h1>Корзина</h1>
            {cartItems.length > 0 ? (
                <>
                    <div className="products-list">
                        {cartItems.map(item => (
                            <div key={item.id} className="basket-item">
                                <Product
                                    id={item.id}
                                    img={item.image_url}
                                    title={item.title}
                                    description={item.description}
                                    cost={item.cost}
                                    category={item.category}
                                    inCart={item.count}
                                    buttons={basketButtons(item.id)}
                                />
                                <div className="item-total">
                                    Сумма: {item.cost * item.count} ₽
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="total-section">
                        <h2>Итого: {totalPrice} ₽</h2>
                        <button className="checkout-button">Оформить заказ</button>
                    </div>
                </>
            ) : (
                <div className="empty-basket">
                    <p>Ваша корзина пуста</p>
                    <Link to="/catalog" className="back-to-catalog">Вернуться в каталог</Link>
                </div>
            )}
        </div>
    );
};

export default BasketPage;
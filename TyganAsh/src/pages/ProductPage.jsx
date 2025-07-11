import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import products from '../../data/products.json';
import categories from '../../data/categories.json';
import Product from '../components/Product';

const ProductPage = () => {
    const { id } = useParams();
    const product = products.find(p => p.id === parseInt(id));
    const [cart, setCart] = useState({});

    useEffect(() => {
        // Загружаем корзину из localStorage при монтировании
        const savedCart = JSON.parse(localStorage.getItem('cart')) || {};
        setCart(savedCart);
    }, []);

    const handleAddToCart = (product) => {
        const updatedCart = { ...cart };

        if (updatedCart[product.id]) {
            updatedCart[product.id].count += 1;
        } else {
            updatedCart[product.id] = {
                ...product,
                count: 1
            };
        }

        localStorage.setItem('cart', JSON.stringify(updatedCart));
        setCart(updatedCart);
        console.log(`Товар "${product.title}" добавлен в корзину`);
    };

    const category = categories.find(c => c.id === product?.category_id)?.title || "Без категории";

    const buttons = [
        {
            type: "button",
            styles: "product__button_darknest",
            path: () => handleAddToCart(product),
            text: "Купить"
        }
    ];

    if (!product) {
        return <h2>Товар не найден</h2>;
    }

    return (
        <section className='section-product container'>
            <div className='content'>
                <Link to="/catalog" className='product__button_lightnest'>Назад</Link>
                <Product
                    id={product.id}
                    key={product.id}
                    img={product.image_url}
                    title={product.title}
                    description={product.description}
                    cost={product.cost}
                    category={category}
                    inCart={cart[product.id]?.count || 0}
                    buttons={buttons}
                />
            </div>

            <p className='product-history'>
                {product.history}
            </p>
        </section>
    );
};

export default ProductPage
import { useState, useEffect } from "react";
import Product from "../components/Product";
import productData from '../../data/products.json';
import categoriesData from '../../data/categories.json';

const CatalogPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [sortBy, setSortBy] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');
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

    const buttons = (product) => [
        {
            type: "link",
            styles: "product__button_lightnest",
            path: `/catalog/product`,
            text: "Посмотреть"
        },
        {
            type: "button",
            styles: "product__button_darknest",
            path: () => handleAddToCart(product),
            text: "Купить"
        }
    ];

    // Создаем объект для быстрого доступа к названию категории по id
    const categoriesMap = categoriesData.reduce((acc, category) => {
        acc[category.id] = category.title;
        return acc;
    }, {});

    // Функция для сортировки товаров
    const sortProducts = (products) => {
        if (!sortBy) return products;

        return [...products].sort((a, b) => {
            let comparison = 0;

            if (sortBy === 'price') {
                comparison = a.cost - b.cost;
            } else if (sortBy === 'date') {
                comparison = (a.id || 0) - (b.id || 0);
            }

            return sortDirection === 'asc' ? comparison : -comparison;
        });
    };

    const filteredProducts = sortProducts(
        productData
            .filter(product => {
                const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
                const matchesCategory = !selectedCategory || product.category_id === selectedCategory;
                return matchesSearch && matchesCategory;
            })
            .map(product => ({
                ...product,
                category: categoriesMap[product.category_id] || "Без категории",
                inCart: cart[product.id]?.count || 0
            }))
    );

    const toggleSortDirection = () => {
        setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    };

    return (
        <>
            <section className="section-search container">
                {/* ... (остается без изменений) ... */}
            </section>

            <section className="section-products container">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <Product
                            id={product.id}
                            key={product.id}
                            img={product.image_url}
                            title={product.title}
                            description={product.description}
                            cost={product.cost}
                            category={product.category}
                            inCart={product.inCart}
                            buttons={buttons(product)}
                        />
                    ))
                ) : (
                    <p>Товары не найдены</p>
                )}
            </section>
        </>
    );
};

export default CatalogPage;
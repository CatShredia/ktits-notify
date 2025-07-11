import { useState, useEffect } from "react";

import Product from "../components/Product";

import productData from '../../data/products.json';
import categoriesData from '../../data/categories.json';

const CatalogPage = () => {
    // поисковая строка
    const [searchTerm, setSearchTerm] = useState("");
    // выбранная категория
    const [selectedCategory, setSelectedCategory] = useState(null);
    // сортировка
    const [sortBy, setSortBy] = useState(null);
    // направление сортировки
    const [sortDirection, setSortDirection] = useState('asc');
    const [cart, setCart] = useState({});

    // подгружаем данные из localStorage
    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart')) || {};
        setCart(savedCart);
    }, []);

    // Добавление в корзину
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

    const categoriesMap = categoriesData.reduce((acc, category) => {
        acc[category.id] = category.title;
        return acc;
    }, {});

    // Сортировка товаров
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

    // Фильтрация продуктов
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

    // Напрвление сортировки
    const toggleSortDirection = () => {
        setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    };

    return (
        <>
            <section className="section-search container">
                <div className="search-controls">
                    <input
                        type="text"
                        name="search"
                        id="search"
                        placeholder="Поиск..."
                        className="searchText"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    <div className="category-filters">
                        <button
                            className={`category-filter ${!selectedCategory ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(null)}
                        >
                            Все категории
                        </button>

                        {categoriesData.map(category => (
                            <button
                                key={category.id}
                                className={`category-filter ${selectedCategory === category.id ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(category.id)}
                            >
                                {category.title}
                            </button>
                        ))}
                    </div>


                    <div className="sort-controls">
                        <span>Сортировка:</span>
                        <button
                            className={`sort-button ${sortBy === 'price' ? 'active' : ''}`}
                            onClick={() => setSortBy('price')}
                        >
                            По цене
                        </button>
                        <button
                            className={`sort-button ${sortBy === 'date' ? 'active' : ''}`}
                            onClick={() => setSortBy('date')}
                        >
                            По дате добавления
                        </button>
                        <button
                            className="sort-direction"
                            onClick={toggleSortDirection}
                        >
                            {sortDirection === 'asc' ? '↑' : '↓'}
                        </button>
                    </div>
                </div>
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
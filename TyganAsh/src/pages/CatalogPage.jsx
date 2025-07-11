import { useState } from "react";
import Product from "../components/Product";
import productData from '../../data/products.json';
import categoriesData from '../../data/categories.json';

const CatalogPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [sortBy, setSortBy] = useState(null); // 'price' или 'date'
    const [sortDirection, setSortDirection] = useState('asc'); // 'asc' или 'desc'

    const buttons = [
        { type: "link", styles: "product__button_lightnest", path: `/catalog/product`, text: "Посмотреть" },
        { type: "button", styles: "product__button_darknest", path: () => console.log("Подробнее о товаре"), text: "Купить" }
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
                // Предполагаем, что у товаров есть поле date (если нет, можно использовать id как пример)
                comparison = (a.id || 0) - (b.id || 0); // Замените на реальное поле даты
            }

            return sortDirection === 'asc' ? comparison : -comparison;
        });
    };

    const filteredProducts = sortProducts(
        productData
            .filter(product => {
                // Фильтр по поисковому запросу
                const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
                // Фильтр по категории (если выбрана)
                const matchesCategory = !selectedCategory || product.category_id === selectedCategory;
                return matchesSearch && matchesCategory;
            })
            .map(product => ({
                ...product,
                category: categoriesMap[product.category_id] || "Без категории"
            }))
    );

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
                            buttons={buttons}
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
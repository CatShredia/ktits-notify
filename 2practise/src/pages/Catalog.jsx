import React, { useState, useMemo } from 'react';
import SellItem from '../components/SellItem';
import products from '../../data/products.json';
import categories from '../../data/category.json';
import Fuse from 'fuse.js';
import Button from '../components/Button';

export default function Catalog() {
    // поиск
    const [searchTerm, setSearchTerm] = useState('');
    // выбранная категория
    const [selectedCategory, setSelectedCategory] = useState(null);
    // цены
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    // порядок сортировки по цене
    const [sortOrder, setSortOrder] = useState(''); // '', 'asc', 'desc'

    const displayedProducts = useMemo(() => {
        let filtered = selectedCategory
            ? products.filter(p => p['Категория'] === selectedCategory)
            : products;

        // Фильтр по цене
        if (minPrice || maxPrice) {
            const min = parseFloat(minPrice) || -Infinity;
            const max = parseFloat(maxPrice) || Infinity;
            filtered = filtered.filter(product => product['Цена'] >= min && product['Цена'] <= max);
        }

        // Поиск по названию
        if (searchTerm) {
            const fuse = new Fuse(filtered, { keys: ['Название'], threshold: 0.4 });
            filtered = fuse.search(searchTerm).map(result => result.item);
        }

        // Делаем копию перед сортировкой, чтобы не мутировать исходный массив
        const result = [...filtered];

        // Сортировка по цене
        if (sortOrder === 'asc') {
            result.sort((a, b) => a['Цена'] - b['Цена']);
        } else if (sortOrder === 'desc') {
            result.sort((a, b) => b['Цена'] - a['Цена']);
        }
        // Если sortOrder пустой — просто возвращаем копию без сортировки

        return result;
    }, [selectedCategory, searchTerm, minPrice, maxPrice, sortOrder]);

    const addBackerCount = (product) => {
        const productId = product.id;

        const currentCount = parseInt(localStorage.getItem(productId), 10) || 0;

        localStorage.setItem(productId, (currentCount + 1).toString());
    };

    return (
        <div className="main-1">
            <p className="main-1-title">Каталог товаров</p>

            {/* корзина */}
            <Button href="/backet" colorBack="blue" colorText="white" content="Перейти в корзину"></Button>

            {/* Фильтры */}
            <div className="main-filter">
                <button
                    type="button"
                    style={{
                        color: !selectedCategory ? 'White' : 'blue',
                        backgroundColor: !selectedCategory ? 'blue' : 'white',
                        border: 'none',
                        padding: '10px 20px',
                        margin: '5px',
                        cursor: 'pointer',
                        fontSize: '16px',
                        borderRadius: '4px',
                    }}
                    onClick={() => setSelectedCategory(null)}
                >
                    Все категории
                </button>

                {categories.map((category, index) => (
                    <button
                        key={index}
                        type="button"
                        style={{
                            color: selectedCategory === category['Название'] ? 'White' : 'blue',
                            backgroundColor: selectedCategory === category['Название'] ? 'blue' : 'white',
                            border: 'none',
                            padding: '10px 20px',
                            margin: '5px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            borderRadius: '4px',
                        }}
                        onClick={() => setSelectedCategory(category['Название'])}
                    >
                        {category['Название']}
                    </button>
                ))}
            </div>

            {/* сортировка по цене */}
            <div className="main-sort">
                <label>Сортировка по цене:</label>
                <button onClick={() => setSortOrder('asc')}>По возрастанию</button>
                <button onClick={() => setSortOrder('desc')}>По убыванию</button>
                <button onClick={() => setSortOrder('')}>Без сортировки</button>
            </div>

            {/* Блок поиска и фильтрации по цене */}
            <div className="main-search-and-filters" style={{ marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                <input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Поиск..."
                    style={{ padding: '8px', fontSize: '16px', width: '200px' }}
                />

                <label style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                    От:
                    <input
                        type="number"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        placeholder="Мин цена"
                        style={{ padding: '5px', width: '100px' }}
                    />
                </label>

                <label style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                    До:
                    <input
                        type="number"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        placeholder="Макс цена"
                        style={{ padding: '5px', width: '100px' }}
                    />
                </label>

                {(minPrice || maxPrice) && (
                    <button
                        onClick={() => {
                            setMinPrice('');
                            setMaxPrice('');
                        }}
                        style={{
                            marginLeft: '10px',
                            background: '#eee',
                            border: '1px solid #ccc',
                            padding: '5px 10px',
                            cursor: 'pointer'
                        }}
                    >
                        Сбросить фильтр по цене
                    </button>
                )}
            </div>

            {/* Товары */}
            <div className="main-1-cat">
                {displayedProducts.length > 0 ? (
                    displayedProducts.map((product, index) => (
                        <SellItem
                            key={index}
                            id={product["id"]}
                            img={product['Путь к картинке']}
                            title={product['Название']}
                            cost={product['Цена']}
                            desc={product['Описание']}
                            backerAction={() => addBackerCount(product)}
                        />
                    ))
                ) : (
                    <p>Товаров не найдено</p>
                )}
            </div>
        </div>
    );
}
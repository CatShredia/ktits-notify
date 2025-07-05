import React, { useState, useMemo } from 'react';
import SellItem from '../components/SellItem';
import products from '../../data/products.json';
import categories from '../../data/category.json';
import Fuse from 'fuse.js';

export default function Catalog() {
    // Условия отбросывания
    const [searchTerm, setSearchTerm] = useState('');
    // Выбранная категория (может быть только одна)
    const [selectedCategory, setSelectedCategory] = useState(null);

    // отображаемые продукты (при изменении параметров обновляется)
    const displayedProducts = useMemo(() => {
        let filtered = selectedCategory
            ? products.filter(p => p['Категория'] === selectedCategory)
            : products;

        // поиск только если не пусто
        if (searchTerm) {
            const fuse = new Fuse(filtered, { keys: ['Название'], threshold: 0.4 });
            filtered = fuse.search(searchTerm).map(result => result.item);
        }

        return filtered;
    }, [selectedCategory, searchTerm]);

    return (
        <div className="main-1">
            <p className="main-1-title">Каталог товаров</p>

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

                {/* Категории выводим из category.json */}
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

            <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Поиск..."
                style={{ marginBottom: '20px', padding: '8px', fontSize: '16px' }}
            />

            <div className="main-1-cat">
                {displayedProducts.length > 0 ? (
                    displayedProducts.map((product, index) => (
                        <SellItem
                            key={index}
                            img={product['Путь к картинке']}
                            title={product['Название']}
                            cost={product['Цена']}
                            desc={product['Описание']}
                        />
                    ))
                ) : (
                    <p>Товаров не найдено</p>
                )}
            </div>
        </div>
    );
}
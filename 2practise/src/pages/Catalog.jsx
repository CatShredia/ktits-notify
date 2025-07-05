import Button from '../components/Button';
import SellItem from '../components/SellItem';
import products from '../../data/products.json';
import categories from '../../data/category.json';

import React, { useState, useMemo } from 'react';
import Fuse from "fuse.js";

export default function Catalog() {

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);

    const displayedProducts = useMemo(() => {
        let filtered = selectedCategory ? products.filter(p => p["Категория"] === selectedCategory) : products;

        if (searchTerm) {
            const fuse = new Fuse(filtered, { keys: ["Название"], threshold: 0.4 });
            filtered = fuse.search(searchTerm).map(result => result.item);
        }

        return filtered;
    }, [selectedCategory, searchTerm]);

    return (
        <div className="main-1">
            <p className="main-1-title">Каталог товаров</p>
            <div className="main-filter">
                <Button
                    colorText="White"
                    colorBack="blue"
                    content="Все товары"
                    onClick={() => setSelectedCategory(null)}
                    type="button"
                />
                <Button colorText="blue" colorBack="white" content="Шины/Колеса" href="#"></Button>
                <Button colorText="blue" colorBack="white" content="Масла" href="#"></Button>
                <Button colorText="blue" colorBack="white" content="Ароматизаторы" href="#"></Button>
            </div>

            {/* Кнопки категорий */}
            <div className="main-filter">
                {/* Кнопка "Все категории" */}
                <Button
                    key="all"
                    colorText={!selectedCategory ? "White" : "blue"}
                    colorBack={!selectedCategory ? "blue" : "white"}
                    content="Все категории"
                    onClick={() => setSelectedCategory(null)}
                    type="button"
                />

                {/* Остальные категории */}
                {categories.map((category, index) => (
                    <Button
                        key={index}
                        colorText={selectedCategory === category["Название"] ? "White" : "blue"}
                        colorBack={selectedCategory === category["Название"] ? "blue" : "white"}
                        content={category["Название"]}
                        onClick={() => setSelectedCategory(category["Название"])}
                        type="button"
                    />
                ))}
            </div>

            {/* Строка поиска */}
            <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Нечеткий поиск..."
            />

            {/* Вывод товаров */}
            <div className="main-1-cat">
                {displayedProducts.length > 0 ? (
                    displayedProducts.map((product, index) => (
                        <SellItem
                            key={index}
                            img={product["Путь к картинке"]}
                            title={product["Название"]}
                            cost={product["Цена"]}
                            desc={product["Описание"]}
                            category={product["Категория"]}
                        />
                    ))
                ) : (
                    <p>Товаров не найдено</p>
                )}
            </div>
        </div>
    );
}
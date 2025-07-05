import Button from '../components/Button';
import SellItem from '../components/SellItem';
import products from '../../data/products.json';

import React, { useState, useEffect } from 'react';
import Fuse from "fuse.js";

export default function Catalog() {

    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([]);

    useEffect(() => {
        console.log('Search Term:', searchTerm);
        if (!searchTerm) {
            setResults([]);
            return;
        }

        const fuse = new Fuse(products, { keys: ["Название"], includeScore: true, threshold: 0.1 });
        const found = fuse.search(searchTerm).map(result => result.item);
        console.log('Found Results:', found);

        setResults(found);
    }, [searchTerm]);

    return (
        <div className="main-1">
            <p className="main-1-title">Каталог товаров</p>
            <div className="main-filter">
                <Button colorText="White" colorBack="blue" content="Все товары" href="#"></Button>
                <Button colorText="blue" colorBack="white" content="Шины/Колеса" href="#"></Button>
                <Button colorText="blue" colorBack="white" content="Масла" href="#"></Button>
                <Button colorText="blue" colorBack="white" content="Ароматизаторы" href="#"></Button>
            </div>
            <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Нечеткий поиск..."
            />
            <div className="main-1-cat">
                {(searchTerm ? results : products).map((product, index) => (
                    <SellItem
                        key={index}
                        img={product["Путь к картинке"]}
                        title={product["Название"]}
                        cost={product["Цена"]}
                        desc={product["Описание"]}
                    />
                ))}
            </div>

        </div>
    );
}
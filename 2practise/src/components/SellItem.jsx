import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';

export default function SellItem(props) {
    const { id, img, title, cost, desc, category, backerAction } = props;

    // Используем useState для хранения количества товара
    const [backerCount, setBackerCount] = useState(0);

    // Подгружаем начальное значение при монтировании компонента
    useEffect(() => {
        const count = parseInt(localStorage.getItem(id), 10) || 0;
        setBackerCount(count);
    }, [id]);

    // Обертка для вызова backerAction + обновление локального состояния
    const handleAddToCart = () => {
        backerAction(); // например, глобальная функция добавления в корзину

        const newCount = backerCount + 1;
        localStorage.setItem(id, newCount.toString());
        setBackerCount(newCount);
    };

    return (
        <div className="main-1-cat-el">
            <img src={img} alt="Ошибка" className="main-1-cat-el--img" />
            <p>В корзине: {backerCount}</p>
            <p className="main-1-cat-el--text">{title}</p>
            <p className="main-1-cat-el--text">{desc}</p>
            <p className="main-1-cat-el--text">Категория: {category}</p>
            <div className="main-1-cat-el-bottom">
                <p className="main-1-cat-el--p">{cost}$</p>
                <Link to={`/catalog/${id}`} className="main-1-cat-el--a">Посмотреть</Link>
                <button type="button" className="main-1-cat-el--a" onClick={handleAddToCart}>В корзину</button>
            </div>
        </div>
    );
}
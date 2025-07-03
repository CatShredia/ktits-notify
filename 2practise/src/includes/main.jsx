import React from 'react';
import SellItem from '../components/SellItem';
import Button from '../components/Button';

import maslo from '../assets/maslo.jpeg'
import shin from '../assets/shin.jpeg'

import products from '../../data/products.json';

class main extends React.Component {
    render() {
        return (
            <main className='main container'>
                <div className="main-1">
                    <p className="main-1-title">Каталог товаров</p>
                    <div className="main-filter">
                        <Button colorText="White" colorBack="blue" content="Все товары" href="#"></Button>
                        <Button colorText="blue" colorBack="white" content="Шины/Колеса" href="#"></Button>
                        <Button colorText="blue" colorBack="white" content="Масла" href="#"></Button>
                        <Button colorText="blue" colorBack="white" content="Ароматизаторы" href="#"></Button>
                    </div>
                    <div className="main-1-cat">
                        {products.map((product, index) => (
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
            </main>
        );
    }
}

export default main;
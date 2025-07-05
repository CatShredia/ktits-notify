import React from 'react';
import { useParams } from 'react-router';
import products from '../../data/products.json'
import SellItem from '../components/SellItem';

function Product() {
    const { id } = useParams();
    const product = products.find(p => p.id === parseInt(id));

    if (!product) {
        return <h2>Товар не найден</h2>;
    }

    return (
        <div id='one'>
            <SellItem
                img={product['Путь к картинке']}
                title={product['Название']}
                cost={product['Цена']}
                desc={product['Описание']}
            />
        </div>
    );
}

export default Product;
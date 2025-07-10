import { Link, useParams } from 'react-router-dom';
import products from '../../data/products.json'
import Product from '../components/Product';

const ProductPage = () => {

    const { id } = useParams();
    const product = products.find(p => p.id === parseInt(id));

    const buttons = [
        { type: "link", styles: "product__button_lightnest", path: `/catalog/product`, text: "Посмотреть" },
        { type: "button", styles: "product__button_darknest", path: () => console.log("Подробнее о товаре"), text: "Купить" }
    ]

    if (!product) {
        return <h2>Товар не найден</h2>;
    }

    return (
        <section section className='section-product container' >
            <div className='content'>
                <Link to="/catalog" className='product__button_lightnest'>Назад</Link>
                <Product
                    id={product.id}
                    key={product.id}
                    img={product.image_url}
                    title={product.title}
                    description={product.description}
                    cost={product.cost}
                    buttons={buttons}
                />
            </div>

            <p className='product-history'>
                {product.history}
            </p>
        </section >
    );
}

export default ProductPage;
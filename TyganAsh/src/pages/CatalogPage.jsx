import Product from "../components/Product";
import productData from '../../data/products.json';

import image from '../assets/i.webp'

// Предполагается, что изображения хранятся в ../assets/
// const images = require.context('../assets', true);

const CatalogPage = () => {
    return (
        <section className="section-products container">
            {console.log(productData)}
            {productData.map((product) => (
                <Product
                    key={product.id}
                    img={product.image_url}
                    // img={images(`./${product.image}`).default}
                    title={product.title}
                    description={product.description}
                />
            ))}
        </section>
    );
};

export default CatalogPage;
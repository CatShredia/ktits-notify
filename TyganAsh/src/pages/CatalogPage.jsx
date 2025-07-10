import Product from "../components/Product";

import imgProduct from '../assets/i.webp'

const CatalogPage = () => {
    return (
        <section className="section-products container">
            <Product img={imgProduct} title="Эчпочмак" description="Треугольные пирожки с мясом, картошкой и луком. Один из символов татарской кухни. "></Product>
            <Product img={imgProduct} title="Эчпочмак" description="Треугольные пирожки с мясом, картошкой и луком. Один из символов татарской кухни. "></Product>
            <Product img={imgProduct} title="Эчпочмак" description="Треугольные пирожки с мясом, картошкой и луком. Один из символов татарской кухни. "></Product>
            <Product img={imgProduct} title="Эчпочмак" description="Треугольные пирожки с мясом, картошкой и луком. Один из символов татарской кухни. "></Product>
        </section>);
}

export default CatalogPage;
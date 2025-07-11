import Product from "../components/Product";
import productData from '../../data/products.json';

const CatalogPage = () => {

    const buttons = [
        { type: "link", styles: "product__button_lightnest", path: `/catalog/product`, text: "Посмотреть" },
        { type: "button", styles: "product__button_darknest", path: () => console.log("Подробнее о товаре"), text: "Купить" }
    ]

    return (
        <>
            <section className="section-search">
                <input type="text" name="text" id="text" placeholder="text" />
            </section>
            <section className="section-products container">
                {productData.map((product) => (
                    <Product
                        id={product.id}
                        key={product.id}
                        img={product.image_url}
                        title={product.title}
                        description={product.description}
                        cost={product.cost}
                        buttons={buttons}
                    />
                ))}
            </section>
        </>

    );
};

export default CatalogPage;
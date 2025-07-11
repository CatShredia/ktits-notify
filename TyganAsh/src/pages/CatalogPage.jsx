import { useState } from "react";
import Product from "../components/Product";
import productData from '../../data/products.json';

const CatalogPage = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const buttons = [
        { type: "link", styles: "product__button_lightnest", path: `/catalog/product`, text: "Посмотреть" },
        { type: "button", styles: "product__button_darknest", path: () => console.log("Подробнее о товаре"), text: "Купить" }
    ];

    const filteredProducts = productData.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <section className="section-search container">
                <input
                    type="text"
                    name="search"
                    id="search"
                    placeholder="Поиск по названию"
                    className="searchText"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </section>
            <section className="section-products container">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <Product
                            id={product.id}
                            key={product.id}
                            img={product.image_url}
                            title={product.title}
                            description={product.description}
                            cost={product.cost}
                            buttons={buttons}
                        />
                    ))
                ) : (
                    <p>Товары не найдены</p>
                )}
            </section>
        </>
    );
};

export default CatalogPage;
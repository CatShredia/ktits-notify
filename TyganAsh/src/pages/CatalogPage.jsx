import { useState } from "react";
import Product from "../components/Product";
import productData from '../../data/products.json';
import categoriesData from '../../data/categories.json';

const CatalogPage = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const buttons = [
        { type: "link", styles: "product__button_lightnest", path: `/catalog/product`, text: "Посмотреть" },
        { type: "button", styles: "product__button_darknest", path: () => console.log("Подробнее о товаре"), text: "Купить" }
    ];

    // Создаем объект для быстрого доступа к названию категории по id
    const categoriesMap = categoriesData.reduce((acc, category) => {
        acc[category.id] = category.title;
        return acc;
    }, {});

    const filteredProducts = productData
        .filter(product =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map(product => ({
            ...product,
            category: categoriesMap[product.category_id] || "Без категории"
        }));

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
                            category={product.category}  // Передаем категорию в компонент Product
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
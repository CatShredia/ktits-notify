import products from '../../data/products.json';
import SellItem from '../components/SellItem';

export default function Backet() {

    const addBackerCount = (product) => {
        const productId = product.id;

        const currentCount = parseInt(localStorage.getItem(productId), 10) || 0;

        localStorage.setItem(productId, (currentCount + 1).toString());
    };

    return (
        <div className="main-1">
            {/* Товары */}
            <div className="main-1-cat">
                {products
                    .filter(product => {
                        const count = parseInt(localStorage.getItem(product.id), 10) || 0;
                        return count > 0;
                    })
                    .map((product, index) => (
                        <SellItem
                            key={index}
                            id={product["id"]}
                            img={product['Путь к картинке']}
                            title={product['Название']}
                            cost={product['Цена']}
                            desc={product['Описание']}
                            backerAction={() => addBackerCount(product)}
                        />
                    ))
                }
            </div>
        </div>
    );
}


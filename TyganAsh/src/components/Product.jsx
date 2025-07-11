import { Link } from 'react-router-dom';

import styles from './Product.module.css';

const Product = (props) => {
    return (
        <div className={styles.product}>
            {/* картинка */}
            <img src={props.img} alt={props.title} className={styles.productImage} />
            {/* название */}
            <h3 className={styles.productTitle}>{props.title}</h3>
            {/* описание */}
            <p className={styles.productDescription}>{props.description}</p>
            {/* цена */}
            <p className={styles.productCost}>{props.cost} ₽</p>
            {/* категория */}
            {props.category && <p className={styles.productCategory}>Категория: {props.category}</p>}
            {/* кол-во в корзине */}
            <p className={styles.inCart}>В корзине: {props.inCart} шт.</p>

            {/* кнопки беруться с пропов со страниц */}
            <div className={styles.buttons}>
                {props.buttons.map((button, index) => {
                    // <Link>
                    if (button.type === 'link') {
                        return (
                            <Link
                                key={index}
                                to={button.path === "/catalog/product" ? `/catalog/${props.id}` : button.path}
                                className={`${styles.productButton} ${button.styles}`}
                            >
                                {button.text}
                            </Link>
                        );
                        // <button>
                    } else if (button.type === 'button') {
                        return (
                            <button
                                key={index}
                                onClick={typeof button.path === 'function' ? button.path : undefined}
                                className={`${styles.productButton} ${button.styles}`}
                                type="button"
                            >
                                {button.text}
                            </button>
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
};

export default Product;
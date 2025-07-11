import { Link } from 'react-router-dom';
import styles from './Product.module.css';

const Product = (props) => {
    return (
        <div className={styles.product}>
            <img src={props.img} alt={props.title} className={styles.productImage} />
            <h3 className={styles.productTitle}>{props.title}</h3>
            <p className={styles.productDescription}>{props.description}</p>
            <p className={styles.productCost}>{props.cost} ₽</p>
            {props.category && <p className={styles.productCategory}>Категория: {props.category}</p>}
            <p className={styles.inCart}>В корзине: {props.inCart} шт.</p>

            <div className={styles.buttons}>
                {props.buttons.map((button, index) => {
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
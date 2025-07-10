import { Link } from 'react-router';
import styles from './Product.module.css';

const Product = (props) => {
    return (
        <div className={styles.product}>
            <img src={props.img} alt={props.title} />
            <h3>{props.title}</h3>
            <p>{props.description}</p>
            <p className={styles.cost}>{props.cost} ₽</p>

            <div className={styles.buttons}>
                {props.buttons.map((button, index) => (
                    button.type === 'link' ? (
                        // Если тип link — рендерим <Link>
                        <Link
                            key={index}
                            to={button.path === "/catalog/product" ? `/catalog/${props.id}` : button.path}
                            className={button.styles}
                        >
                            {button.text}
                        </Link>
                    ) : button.type === 'button' ? (
                        // Если тип button — рендерим <button>
                        <button
                            key={index}
                            onClick={typeof button.path === 'function' ? button.path : undefined}
                            className={button.styles}
                            type="button"
                        >
                            {button.text}
                        </button>
                    ) : null
                ))}
            </div>
        </div>
    );
};

export default Product;
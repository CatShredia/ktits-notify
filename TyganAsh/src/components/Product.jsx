import { Link } from 'react-router';
import styles from './Product.module.css'

const Product = (props) => {
    return (
        <div className={styles.product}>
            <img src={props.img} alt="error" />
            <h3>{props.title}</h3>
            <p>{props.description}</p>
            <p className={styles.cost}>{props.cost}</p>

            <div className={styles.buttons}>
                {props.buttons.map((button, index) => (
                    <Link
                        key={index}
                        to={button.path === "/catalog/product" ? `/catalog/${props.id}` : button.path}
                        className={button.styles}
                    >
                        {button.text}
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Product;
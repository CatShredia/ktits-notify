import styles from './Product.module.css'

const Product = (props) => {
    return (
        <div className={styles.product}>
            <img src={props.img} alt="error" />
            <h3>{props.title}</h3>
            <p>{props.description}</p>
        </div>
    );
}

export default Product;
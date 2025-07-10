import { Link } from "react-router-dom";

import styles from './Banner.module.css'

const Banner = (props) => {
    return (
        <div className={styles.banner}>
            <img src={props.imgObject} alt="error" className={styles.img} />
            <div className={styles.content}>
                <h1 className={styles.slogan}>{props.SloganContent}</h1>
                <Link to="/catalog" className={styles.button}>{props.buttonContent}</Link>
            </div>
        </div>
    );
}

export default Banner;
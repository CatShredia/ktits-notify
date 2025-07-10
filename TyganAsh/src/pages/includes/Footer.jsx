import { Link } from "react-router";

import LogoImg from '../../assets/logo.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
    return (
        <footer className="footer container">
            <Link to="/" className="logo">
                <img src={LogoImg} alt="error" /></Link>
            <nav className="footer__links">
                <dl>
                    <dt><Link className="footer__link" to="/catalog">Каталог</Link></dt>
                    <dt><Link className="footer__link" to="/backet">Корзина</Link></dt>
                    <dt><Link className="footer__link" to="/auth"><FontAwesomeIcon icon={faUser} /></Link></dt>
                </dl>
            </nav>
        </footer>
    );
}

export default Footer;
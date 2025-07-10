import { Link } from "react-router";

import LogoImg from '../../assets/logo.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    return (
        <header className="header container">
            <Link to="/" className="logo">
                <img src={LogoImg} alt="error" /></Link>
            <nav className="header__links">
                <dl>
                    <dt><Link className="header__link" to="/catalog">Каталог</Link></dt>
                    <dt><Link className="header__link" to="/backet">Корзина</Link></dt>
                    <dt><Link className="header__link" to="/auth"><FontAwesomeIcon icon={faUser} /></Link></dt>
                </dl>
            </nav>
        </header>
    );
}

export default Header;
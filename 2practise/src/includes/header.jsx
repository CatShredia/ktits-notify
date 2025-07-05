import React from 'react';
import logo from "../assets/logo.png";
import Button from '../components/Button';
import { Link } from 'react-router';

class header extends React.Component {
    render() {
        return (
            <header className="header container">
                <div className="header-top">
                    <div className="header-left">
                        <Button content="О нас" colorText="blue" href="/about" colorBack="none"></Button>
                        <Button content="Каталог" colorText="black" href="/catalog" colorBack="none"></Button>
                        <Button content="Где найти нас" colorText="black" href="#" colorBack="none"></Button>
                    </div>
                    <Link to="/">
                        <img src={logo} alt="Ошибка" className="header-img" />
                    </Link>
                    <div className="header-right">
                        <Button content="Регистрация" colorText="white" href="#" colorBack="rgb(33, 33, 33)"></Button>
                        <Button content="Вход" colorText="white" href="#" colorBack="blue"></Button>
                    </div>
                </div>
                <div></div>
                <div className="header-bottom--m">
                    <a className="header-bottom">
                        <Button
                            content={
                                <>
                                    О компании <span style={{ color: 'blue' }}>АвтоТорг</span>
                                </>
                            }
                            colorText="black"
                            href="#"
                            colorBack="rgb(185, 185, 185)"
                        />
                    </a>
                </div>
            </header>
        );
    }
}

export default header;
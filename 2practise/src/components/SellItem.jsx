import React from 'react';
import { Link } from 'react-router';

class SellItem extends React.Component {
    render() {
        const { id } = this.props;
        const { img } = this.props;
        const { title } = this.props;
        const { cost } = this.props;
        const { desc } = this.props;
        const { category } = this.props;

        return (
            <div className="main-1-cat-el">
                <img src={img} alt="Ошибка" className="main-1-cat-el--img" id="1.1" />
                <p className="main-1-cat-el--text" id="1">{title}</p>
                <p className="main-1-cat-el--text">{desc}</p>
                <p className="main-1-cat-el--text">Категория: {category}</p>
                <div className="main-1-cat-el-bottom">
                    <p className="main-1-cat-el--p">{cost}$</p>
                    <Link to={`/catalog/${id}`} className="main-1-cat-el--a">Посмотреть</Link>
                </div>
            </div>
        );
    }
}

export default SellItem;
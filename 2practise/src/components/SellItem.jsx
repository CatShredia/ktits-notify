import React from 'react';

class SellItem extends React.Component {
    render() {
        const { img } = this.props;
        const { title } = this.props;
        const { cost } = this.props;
        const { desc } = this.props;

        return (
            <div className="main-1-cat-el">
                <img src={img} alt="Ошибка" className="main-1-cat-el--img" id="1.1" />
                <p className="main-1-cat-el--text" id="1">{title}</p>
                <p className="main-1-cat-el--text">{desc}</p>
                <div className="main-1-cat-el-bottom">
                    <p className="main-1-cat-el--p">{cost}$</p>
                    <a href="" className="main-1-cat-el--a">Добавить в корзину</a>
                </div>
            </div>
        );
    }
}

export default SellItem;
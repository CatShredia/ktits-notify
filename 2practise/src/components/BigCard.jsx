import React from 'react';
import Button from '../components/Button'

class BigCard extends React.Component {
    render() {
        const { img } = this.props;
        const { name } = this.props;
        const { content } = this.props;
        const { cost } = this.props;


        return (
            <main className="main container">
                <Button colorText="blue" colorBack="gainsboro" href="/" content="< На главную"></Button>

                <div className='big-card'>
                    <img src={img} alt="ERROR" />
                    <div className='big-card-content'>
                        <h2 className='big-card-content__title'>{name}</h2>
                        <p className='big-card-content__text'>{content}</p>

                        <div className="big-card-content__full">
                            <p className='big-card-content__cost'>{cost} ₽</p>
                            <button className='big-card-content__sell-button'>Добавить в корзину</button>
                        </div>

                    </div>
                </div>
            </main>
        );
    }
}

export default BigCard;
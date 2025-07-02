import React from 'react';

class Button extends React.Component {
    render() {
        const { colorText } = this.props;
        const { colorBack } = this.props;
        const { href } = this.props;
        const { content } = this.props;


        const styles = {
            backgroundColor: colorBack,
            padding: '10px 20px',
            color: colorText,
            textAlign: 'center',
            borderRadius: '5px',
            fontSize: '15px',
            margin: '10px'
        };

        return <a href={href} style={styles}>{content}</a>;
    }
}

export default Button;
import React, { Component } from 'react';
import './ItemList.css';

export default class ItemList extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            product: props.product,
            amount: 1
        }
    }

    deleteFromCart = () => {
        this.props.deleteProductFromCart(this.state.product);
    }

    addToCart = () => {
        this.props.addProductToCart(this.state.product, this.state.amount);
    }
    
    render() {
        return (
            <div className='singleCartProduct'>
                <p className='cartProductTitle'>{this.state.product.title} &times; {this.state.product.quantity}</p>
                <div className="imageItemCart" style={{ backgroundImage: `url(${require(`../../Images/Food_Images/${this.state.product.image}`)})` }} />
                <p className='cartProducPrice'>$ {this.props.totalPriceProduct}</p>
                <button type='button' className='addProductBtn' onClick={this.addToCart}>+</button>
                <button type='button' className='deleteProductBtn' onClick={this.deleteFromCart}>-</button>
            </div>
        )
    }
}

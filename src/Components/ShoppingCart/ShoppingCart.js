import React, { Component } from 'react';
import ItemList from '../Item/ItemList';
import './ShoppingCart.css';

export default class ShoppingCart extends Component {
    constructor(props) {
        super(props)

        this.state = {
            cartList: props.shoppingCartList
        }
    }

    render() {
        return (

            <div className="cartList">
                {
                    this.state.cartList.map((product) => {
                        let totalPriceProduct = product.price * product.quantity;

                        return ( <ItemList 
                            product={product} 
                            deleteProductFromCart={this.props.deleteProductFromCart}
                            addProductToCart={this.props.addProductToCart} 
                            totalPriceProduct={totalPriceProduct.toFixed(2)} /> )
                    })
                }
            </div>
        )
    }
}

import React, { Component } from 'react';
import './Display.css';
import { Link } from 'react-router-dom';


export default class Display extends Component {
    constructor(props) {
        super(props)

        this.state = {
            displayStyle: props.displayStyle,
            currentProduct: props.currentProduct,
            amount: 1
        }
    }

    closeDisplay = () => {
        this.setState({ displayStyle: "none" });
        this.props.showProductDisplay(null);
    }

    addToCart = () => {
        this.props.addProductToCart(this.state.currentProduct, this.state.amount);
    }

    disableKeyboard = (e) => {
        e.preventDefault();
    }

    saveAmount = (e) => {
        this.setState({amount: Number(e.target.value)});
    }

    render() {
        return (
            <div>
                <div className="finishMessage" style={{ display: this.state.displayStyle }} >
                    <div className="messageBox">
                        <Link to="/">
                            <button type="button" className="closeButton" onClick={this.closeDisplay} >X</button>
                        </Link>

                        <p className="message">{this.state.currentProduct.title}</p>
                        <p>Type: {this.props.currentProduct.type}</p>
                        <p>Price: ${this.props.currentProduct.price}</p>

                        <input type="number" min='1' max='10' maxLength='1' defaultValue='1' className="quantityInput"
                        onKeyPress={this.disableKeyboard} 
                        onChange={this.saveAmount}></input>

                        <Link to="/">
                            <button type="button" className="addButton" onClick={this.addToCart} >Add To Cart</button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

import React, { Component } from 'react';
import Product from '../Product/Product';
import './HomePage.css';
import Display from '../AddDisplay/Display';


export default class HomePage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            listOfProducts: props.listOfProducts,
            displayFlag: false,
            currentProduct: {}
        }
    }

    showProductDisplay = (product) => {
        this.setState(prevState => {
            return { displayFlag: !prevState.displayFlag, currentProduct: product }
        });
    }

    render() {
        return (


                <div className="productList">
                    {
                        this.state.listOfProducts.map((product) => {
                            return (<Product
                                key={product.id}
                                product={product}
                                showProductDisplay={this.showProductDisplay} />)
                        })
                    }
                    {
                        this.state.displayFlag &&
                        <Display
                            displayStyle="block"
                            currentProduct={this.state.currentProduct}
                            showProductDisplay={this.showProductDisplay}
                            addProductToCart={this.props.addProductToCart} />
                    }
                </div>


        )
    }
}

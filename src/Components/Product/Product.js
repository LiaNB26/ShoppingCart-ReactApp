import React, { Component } from 'react';
import './Product.css';


export default class Product extends Component {
    constructor(props) {
        super(props)

        this.state = {
            product: props.product,
        }
    }

    openDisplay = () => {
        this.props.showProductDisplay(this.state.product);
    }


    render() {
        return (

            <div className='cardProduct' onClick={this.openDisplay}>
                <abbr title="click to add item..." >

                    <div className="singleProductFront" >
                        <h2>{this.state.product.title}</h2>
                        <h4>{this.state.product.type}</h4>
                        <h3>$ {this.state.product.price}</h3>
                    </div>

                    <div className="singleProductBack" style={{ backgroundImage: `url(${require(`../../Images/Food_Images/${this.state.product.image}`)})` }} >
                    </div>
                </abbr>

            </div>

        )
    }
}

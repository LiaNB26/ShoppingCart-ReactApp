import React, { Component } from 'react';
import './App.css';
import HomePage from './Components/HomePage/HomePage';
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';
import ShoppingCart from './Components/ShoppingCart/ShoppingCart';
import { Products } from './Components/Product/ProductsList';
import SearchBox from './Components/SearchBox/SearchBox';


export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      listOfProducts: Products,
      shoppingCartList: [],
      totalCartPrice: 0,
      homeButton: 'none',
      cartButton: 'block',
      buyButton: 'none',
      searchField: '',
      category: '',
      reloadPage: false
    }
  }

  addProductToCart = (newProduct, quantity) => {

    let exist = false;
    let addToTotalPrice = newProduct.price * quantity;

    let updatedCart = this.state.shoppingCartList.map(product => {
      if (product.id === newProduct.id) {
        exist = true;
        return { ...product, quantity: product.quantity + quantity }
      }
      else {
        return product;
      }
    })

    if (!exist) {
      updatedCart = [...updatedCart, { ...newProduct, quantity: quantity }];
    }

    this.setState(st => {
      return {
        totalCartPrice: st.totalCartPrice + addToTotalPrice,
        shoppingCartList: updatedCart
      }
    });

  }

  deleteProductFromCart = (deleteProduct) => {

    let updatedCart = this.state.shoppingCartList.map(product => {
      if (product.id === deleteProduct.id) {
        return { ...product, quantity: product.quantity - 1 }
      }
      else {
        return product;
      }
    })

    if (deleteProduct.quantity - 1 === 0) {
      updatedCart = updatedCart.filter(product => product.id !== deleteProduct.id);
    }


    this.setState(st => {
      return {
        totalCartPrice: st.totalCartPrice - deleteProduct.price,
        shoppingCartList: updatedCart
      }
    });

  }

  hideHomePageBtn = () => {
    this.setState({ homeButton: 'none' });
    this.setState({ cartButton: 'block' });
  }

  hideCartBtn = () => {
    this.setState({ homeButton: 'block' });
    this.setState({ cartButton: 'none' });
  }

  buyAllItems = () => {
    this.hideHomePageBtn();
    this.setState({ searchField: '', category: '', reloadPage: true });

    if (this.state.shoppingCartList.length === 0) {
      alert('Nothing to Buy...\nYour Shopping Cart is Empty... :(');
    }
    else {
      this.setState({ shoppingCartList: [], totalCartPrice: 0 });
      alert(`Thank You for Shopping at the Farmers' Market!!! :)`);
    }
  }

  clearAllItems = () => {
    if (this.state.shoppingCartList.length === 0) {
      alert('Your Shopping Cart is Empty...');
    }
    else {
      this.setState({ shoppingCartList: [], totalCartPrice: 0 });
      alert(`Removing All Products from your Cart...`);
    }
  }

  handleSearch = (e) => {
    this.setState({ searchField: e.target.value });
  }

  handleCategorySelect = (e) => {
    this.setState({ category: e.target.value });
  }

  componentDidUpdate() {
    if(this.state.reloadPage) {
      window.top.location.reload();
    }
  }

  render() {
    const { listOfProducts, searchField, category } = this.state;
    const filteredListByCategory = listOfProducts.filter(product => product.type.toLowerCase().includes(category.toLowerCase()));
    const filteredProducts = filteredListByCategory.filter(product => product.title.toLowerCase().includes(searchField.toLowerCase()));

    return (
      <div className="App">

        <Router>

          <Link to="/" className="homeButtonLink" style={{ display: `${this.state.homeButton}` }}>
            <button className="homeButton" onClick={this.hideHomePageBtn}>Home</button>
          </Link>
          <h2 className="homePageTitle" style={{ display: `${this.state.cartButton}` }}>Home Page</h2>
          <SearchBox
            handleSearch={this.handleSearch}
            showSearchBox={this.state.cartButton}
            handleCategorySelect={this.handleCategorySelect}
            inputValue={this.state.searchField} />

          <Switch>

            <Route exact path='/' component={() => {
              return <HomePage
                listOfProducts={filteredProducts}
                addProductToCart={this.addProductToCart} />
            }} />

            <Route exact path='/shoppingCart' component={() => {
              return <ShoppingCart
                shoppingCartList={this.state.shoppingCartList}
                deleteProductFromCart={this.deleteProductFromCart}
                addProductToCart={this.addProductToCart}
                totalCartPrice={this.state.totalCartPrice} />
            }} />

          </Switch>

          <Link to="/shoppingCart" className="cartButtonLink" style={{ display: `${this.state.cartButton}` }}>
            <button className="cartButton" onClick={this.hideCartBtn}>Cart</button>
          </Link>

          <h2 className="cartTitle" style={{ display: `${this.state.homeButton}` }}>My Cart</h2>

          <h2 className="totalPriceTitle" style={{ display: `${this.state.homeButton}` }}>Total Price: ${this.state.totalCartPrice.toFixed(2)}</h2>

          <Link to="/" className="buyButtonLink" style={{ display: `${this.state.homeButton}` }}>
            <button className="buyButton" onClick={this.buyAllItems}>Buy</button>
          </Link>
          <button className="deleteAllCartButton" style={{ display: `${this.state.homeButton}` }} onClick={this.clearAllItems}>Clear All</button>

        </Router>

      </div>
    )
  }
}

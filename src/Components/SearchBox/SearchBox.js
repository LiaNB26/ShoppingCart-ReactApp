import React, { Component } from 'react';
import './SearchBox.css';

export default class SearchBox extends Component {
    constructor(props) {
        super(props)

        this.state = {
            listOfTypes: ['vegetable', 'fruit', 'dairy', 'meat', 'bakery']
        }
    }

    render() {
        return (
            <div className='searchContainer' style={{ display: this.props.showSearchBox }} >
                <input
                    className="searchBox"
                    type="search"
                    placeholder='search for items...'
                    onChange={this.props.handleSearch} />

                <select className='typeSelect'  onChange={this.props.handleCategorySelect}>
                    <option value=''>All</option>
                    {
                        this.state.listOfTypes.map(type => (
                            <option value={`${type}`} >{type}</option>
                        ))
                    }
                </select>
            </div>
        )
    }
}

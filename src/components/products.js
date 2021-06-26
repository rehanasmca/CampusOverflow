import React, { Component } from 'react';
class Products extends Component {
    constructor(props) {
        super(props);
        this.state = { products: {} };
    }

    getProducts = () => {
        fetch('products.json'
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then(function (response) {
                console.log(response)
                return response.json();
            })
            .then((myJson) => {
                console.log(myJson);
                this.setState({ products: myJson });
            });
    }

    componentDidMount() {
        this.getProducts();
    }

    render() {
        return (
            <>
                <h1>All Products</h1>
                <ul>
                    {this.state.products ? Object.keys(this.state.products).map((item, index) =>
                         <li key={index}>
                             <div>
                             <label>Id</label>
                             <h6>{this.state.products[item].id}</h6>
                             <label>Product name</label><h6>{this.state.products[item].name}</h6>
                             <label>Product description</label><p>{this.state.products[item].description}</p>
                             </div></li>
                        
                        ) : ""}
                   
                </ul>
            </>
        )
    }
}

export default Products;
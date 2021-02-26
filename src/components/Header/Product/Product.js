import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee,faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css';

const Product = (props) => {
    // console.log(props.product.name)
    const {img, name, seller, price, stock} =props.product;
    return (
        <div className="product">
            <div>
                <img src={props.product.img}/>
            </div>

            <div>
                <h4 className ="product-name">{name}</h4>
                <br/>
                <p><small>by: {seller}</small></p>
                <p>${price}</p>
                <p><small>Only {stock} left in stock - Order Soon</small></p>
                <button className="main-button"
                    onClick={()=>{
                        props.handleAddProduct(props.product)
                    }}
                    >
                    <FontAwesomeIcon icon={faShoppingCart} /> Add to cart
                    </button>
            </div>            
            
        </div>
    );
};

export default Product;
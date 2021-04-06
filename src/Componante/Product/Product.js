import React from 'react';
import { Link } from 'react-router-dom';
import './Product.css';


const Product = (props) => {
    const {imageURL, name, price, _id} = props.products

    return (
        <div className="col-xl-3 col-lg-4 col-md-6">
            <div className="single-service text-center">
                <img src={imageURL} alt="error"/>
                <h3>{name}</h3>
                <h5 className="mb-4">{price}</h5>
                <Link to={`/checkOut/${_id}`}>
                    <button className="btn btn-warning">
                        Buy Now
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Product;
import './Home.css'
import { useEffect, useState } from 'react';
import Product from '../Product/Product';
import { CircularProgress } from '@material-ui/core';

const Home = () => {
    const [product, setProduct] = useState([]) 
    useEffect(() =>{
        fetch('https://polar-woodland-92583.herokuapp.com/product')
        .then(res => res.json())
        .then(data => setProduct(data))
        
    },[])
    return (
        <div className="home-bg d-flex align-items-center">
            <div className="container">
                <div className="search-bar text-center">
                    <input type="text" placeholder="Search Products"/>
                    <button>Search</button>
                </div>
                <div className="spinner text-center">
                    
                    {
                        product.length === 0 &&
                        <div><CircularProgress disableShrink /></div>
                    }
                </div>
                <div className="row">
                    
                    {
                        product.map(pd => <Product products={pd}></Product>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Home;
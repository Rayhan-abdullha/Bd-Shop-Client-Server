import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../App';
import './Orders.css'
const Orders = () => {
    const [checkOut, setCheckOut] = useState([])
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    useEffect(() => {
        fetch('https://polar-woodland-92583.herokuapp.com/checkout')
        .then(res => res.json())
        .then(data => setCheckOut(data))
    },[])

    // checkOut delete
    const deleteCheckOutProduct = (id) => {
        fetch(`https://polar-woodland-92583.herokuapp.com/delete/${id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(result => {
            console.log('delete sucessfully')
        })
    }

    return (
        <div className="ordered-product">
           <div className="container">
                <h2 className="mb-4 mt-4">You have ({checkOut.length}) Products Order</h2>
                    {
                    checkOut.map(pd => 
                        <div className="single-oreder">
                            <div className="product-img">
                                <img src={pd.products.imageURL} alt="notFound"/>
                            </div>
                            <div className="product-content">
                                <h4>{pd.products.name}</h4>
                                <span>{pd.loggedInUser.email}</span>
                                <span>{pd.selectedDate.chackOutdate}</span>
                                <span>quantity - 1</span>
                                <h5 className="mt-4">{pd.products.price}</h5>
                                <button onClick={() => deleteCheckOutProduct(pd._id)} className="btn btn-primary mt-3"
                                    style={{border: "0", }}>
                                    Delete</button>
                            </div>
                        </div>
                        )
                    }
           </div>
        </div>
    );
};

export default Orders;
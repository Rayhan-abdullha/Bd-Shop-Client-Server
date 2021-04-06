import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Delete, Edit } from '@material-ui/icons';
import './ManageProduct.css'
import { CircularProgress } from '@material-ui/core';

const ManageProduct = () => {
    const [product, setProduct] = useState([])
    useEffect(() =>{
        fetch('https://polar-woodland-92583.herokuapp.com/product')
        .then(res => res.json())
        .then(data => setProduct(data))
        
    },[])

    const deleteProduct = (id) => {
        fetch(`https://polar-woodland-92583.herokuapp.com/deleted/${id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(result => {
            console.log('delete sucessfully')
        })
    }
    return (
        <div className="manageProduct">
           <div className="container">
           <div className="spinner text-center">
                {
                    product.length === 0 &&
                    <div><CircularProgress disableShrink /></div>
                }
            </div>
                <table className="manageItems">
                    <tr style={{padding: "10px 0"}}>
                        <th>Name</th>
                        <th>Price</th> 
                        <th>Quantity</th> 
                        <th>Action</th>
                    </tr>
                    {
                        product.map(pd => 
                            <tr>
                                <td>{pd.name}</td>
                                <td>{pd.price}</td>
                                <td className="pl-5">1</td>
                                <td><Edit/> <Delete onClick={() => deleteProduct(pd._id)}/></td>
                            </tr>    
                        )
                    }
                </table>
           </div>
        </div>
    );
};

export default ManageProduct;
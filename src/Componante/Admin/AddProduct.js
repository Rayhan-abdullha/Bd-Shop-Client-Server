import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import './addProduct.css'
const AddProduct = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [imageURL, setIMageURL] = useState(null);

    const onSubmit = data => {
        const productData = {
            name: data.name,
            imageURL: imageURL,
            price: data.price
        }
        const url = 'https://polar-woodland-92583.herokuapp.com/addEvent';
        fetch(url, {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
          })
          .then(res => console.log('server side response', res))
        };

        const handleImageUpload = event => {
            console.log(event.target.files[0])
            const imageData = new FormData();
            imageData.set('key', 'e43dd6c6b2f81f468021da3067d52f88');
            imageData.append('image', event.target.files[0]);
            
            axios.post('https://api.imgbb.com/1/upload', 
            imageData)
            .then(function (response) {
            setIMageURL(response.data.data.display_url);
            })
            .catch(function (error) {
            console.log(error);
            });
        
        }
   
    return (
        <div className="addProduct">
            <div className="container">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="">Product Name</label><br/>
                    <input name="name" placeholder="Enter Product Name" ref={register} /><br/>
                    <label htmlFor="">Product Price</label><br/>
                    <input name="price" placeholder="Enter Product Price" ref={register} /><br/>
                    <label htmlFor="">Add Photo</label><br/>
                    <input name="exampleRequired" type="file" onChange={handleImageUpload} /><br/>
                    <input type="submit" value="Save"/>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
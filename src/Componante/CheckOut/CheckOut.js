import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import './CheckOut.css';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { UserContext } from '../../App';
import { useContext } from 'react';
const CheckOut = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const {productId} = useParams();

    const [products, setProducts] = useState([]) 
    useEffect(() =>{
        fetch('https://polar-woodland-92583.herokuapp.com/product/' + productId)
        .then(res => res.json())
        .then(data => setProducts(data))
        
    },[productId])

    // date
    const [selectedDate, setSelectedDate] = useState({
        chackOutdate: new Date()

    })
    const handleDateChange = (date) => {
        const newDate = {...selectedDate}
        newDate.chackOutdate = date
        setSelectedDate(newDate);
    };

    // chackOut button
    const handleChackOut = () => {
       const checkOutInfo = {selectedDate, loggedInUser, products}

        fetch(`https://polar-woodland-92583.herokuapp.com/addCheckOut`, {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(checkOutInfo)
          })
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
        
       
    }
    return (
        <div className="orders">
            <div className="container">
                <h2>Checkout</h2>
                <table className="order-items">
                    <tr>
                        <th>Description</th>
                        <th>Quantity</th> 
                        <th>Price</th>
                    </tr>
                    <tr>
                        <td>{products.name}</td>
                        <td>1</td>
                        <td>{products.price}</td>
                    </tr>
                    <tr>
                        <td>Total</td>
                        <td>1</td>
                        <td>{products.price}</td>
                    </tr>
                </table>
                
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Date picker inline"
                        value={selectedDate.date}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                        'aria-label': 'change date',
                        }}
                    />
                    <KeyboardTimePicker
                        margin="normal"
                        id="time-picker"
                        label="Time picker"
                        value={selectedDate.date}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                        'aria-label': 'change time',
                        }}
                    />
                    </Grid>
                </MuiPickersUtilsProvider>
                <div className="checkOutBtn">
                <Link to='/checkoutsuccess'>
                    <button onClick={handleChackOut} className="btn btn-warning">CheckOut</button>
                </Link>    
                </div>
            </div>
        </div>
    );
};

export default CheckOut;
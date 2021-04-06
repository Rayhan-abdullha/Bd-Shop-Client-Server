import { Add, Edit } from '@material-ui/icons';
import AppsIcon from '@material-ui/icons/Apps';
import React from 'react';
import { Link } from 'react-router-dom';
import './Admin.css'

const Admin = () => {
    return (
        <div className="admin-page">
           <div className="container">
            <nav className="text-center">
                <ul>
                    <li><Link to="/manageProduct"><AppsIcon/> Manage Product</Link></li>
                    <li><Link to="/addProduct"><Add/> Add Product</Link></li>
                    <li><Link to="/manageProduct"><Edit/> Edit Product</Link></li>
                </ul>
            </nav>
           </div>
        </div>
    );
};

export default Admin;
import React, { useEffect, useState } from 'react'
import "../src/product.css";
import Button from 'react-bootstrap/Button';
import { FaCartPlus } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import Select from 'react-select';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { Link } from 'react-router-dom';

const Alert = React.forwardRef(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Products = () => {
    let data = localStorage.getItem("checkoutData");
    data = JSON.parse(data);
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(data?.length > 0 ? data : []);
    const [open, setOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const options = [
        { value: 'price', label: 'Price :- Low - High' },
        { value: '-price', label: 'Price :- High - Low' },
        { value: 'title', label: 'Name :- A - Z' },
        { value: '-title', label: 'Name :- Z - A' },
    ];

    const fetchUserData = () => {
        fetch("https://fakestoreapi.com/products")
            .then(response => {
                return response.json()
            })
            .then(data => {
                setProducts(data)
            })
    }
    useEffect(() => {
        fetchUserData()
    }, [])

    const sorting = (data) => {
        if (data?.value == 'title') {
            products.sort(function (a, b) {
                if (a.title < b.title) {
                    return -1;
                }
                if (a.title > b.title) {
                    return 1;
                }
                return 0;
            });
        }
        else if (data?.value == '-title') {
            products.sort(function (a, b) {
                if (a.title > b.title) {
                    return -1;
                }
                if (a.title < b.title) {
                    return 1;
                }
                return 0;
            });
        } else if (data?.value == 'price') {
            products.sort(function (a, b) {
                if (a.price < b.price) {
                    return -1;
                }
                if (a.price > b.price) {
                    return 1;
                }
                return 0;
            });
        }
        else if (data?.value == '-price') {
            products.sort(function (a, b) {
                if (a.price > b.price) {
                    return -1;
                }
                if (a.price < b.price) {
                    return 1;
                }
                return 0;
            });
        }

        setProducts(products)

    }
    const handleSelectChange = (data) => {
        setSelectedOption(data);
        sorting(data)
    }

    console.log(products, '*************')
    useEffect(() => {
        setProducts(products)
    }, [products])

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (data) => {
        selectedProduct.push(data)
        setSelectedProduct(selectedProduct)
        localStorage.setItem('checkoutData', JSON.stringify(selectedProduct))
        setOpen(true);
    };
    setTimeout(() => {
        setOpen(false)
    }, 1000)
    return (
        <>

            <div className='body'>
                <a style={{ float: "right", fontSize: "50px" }}><CgProfile style={{ color: 'black' }} /></a>
                <Link to={`/checkout`} className="checkout-count">{selectedProduct?.length}</Link>
                <Link to={`/checkout`} style={{ float: "right", fontSize: "50px" }}><FaCartPlus style={{ color: 'black' }} /></Link>
                <Select
                    defaultValue={selectedOption}
                    onChange={(data) => handleSelectChange(data)}
                    options={options}
                    className='dropdown'
                    placeholder="Sort By"
                />
            </div>
            <div className="cards">
                {products?.map((item) =>

                (<div className="card">
                    <img className='img' src={item.image} />
                    <span className='discription'>
                        {item.title}
                        <br />
                        <b>Price:${item.price}</b>
                    </span>
                    <Button type='button' className="btn btn-dark" variant="primary" onClick={() => handleChange(item)}>Add to cart</Button>
                </div>)

                )}
            </div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Product has added succesFully
                </Alert>
            </Snackbar>
        </>

    )
}

export default Products

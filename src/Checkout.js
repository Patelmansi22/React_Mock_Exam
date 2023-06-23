import React, { useEffect, useState } from 'react'
import "../src/product.css";
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';

const Alert = React.forwardRef(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const Checkout = () => {
    let data = localStorage.getItem("checkoutData");
    data = JSON.parse(data);
    const navigate = useNavigate();
    const [products] = useState(data);
    const [check, setCheck] = useState(false)
    const [succes, setsucces] = useState(false)
    const handleChange = () => {
        setCheck(!check)
        console.log(545454)
    }

    const handleCheckout = () => {
        setsucces(true);
        localStorage.removeItem("checkoutData");
        setTimeout(() => {
            navigate("/");
        }, 1000)
    }
    return (
        <>


            {products ? <div>
                {!succes ? <><h3><center>Product Checkout</center></h3>
                    <table border={2} align='center'>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Price</th>
                        </tr>

                        {products?.map((item) =>

                        (<tr border={2}>
                            <td width={300}><img className='checkout-img' src={item.image} /></td>
                            <td width={600}>{item.title}</td>
                            <td>${item.price}</td>
                        </tr>)


                        )}
                        <tr>
                            <th></th>
                            <th>Total</th>
                            <th>${products.map(o => o.price).reduce((a, c) => { return a + c })}</th>
                        </tr>
                    </table>
                    <br />
                    <div className='checkbox'><input type='checkbox' onChange={() => { handleChange() }} /><label for="vehicle1" >Cash on Delivery</label></div><br />
                    <div className='checkbox'> <button className='btn btn-dark' type='button' disabled={!check} onClick={handleCheckout}>Checkout</button></div>
                </> : <div className='s-body'><div className="s-card">
                    <div style={{ borderRadius: '200px', height: '200px', width: '200px', background: '#F8FAF5', margin: '55px' }}>
                        <i className="checkmark">✓</i>
                    </div>
                    <h1 className='h1'>Success</h1>
                    <p className='p'>We received your order request<br /> Total:${products.map(o => o.price).reduce((a, c) => { return a + c })}</p>
                </div></div>} </div> : <h1 className='h1' style={{ textAlign: 'center' }}>No Data</h1>}

        </>
    )
}

export default Checkout;

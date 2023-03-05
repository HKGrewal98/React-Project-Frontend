import React from "react";
import { useState, useContext } from "react";
import { AddressContext } from "../../store/AddressContext";
import mealContext from "../../store/MealItemContext";
import { useForm } from "react-hook-form";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import { useNavigate } from "react-router-dom";


const PaymentForm = (props) => {
 const addressCtx = useContext(AddressContext)
 const mealCtx = useContext(mealContext)
 const { register, handleSubmit, watch, formState: { errors } , reset} = useForm({
    mode:"onSubmit",
		reValidateMode:"onChange"
 });
 const [hasError,setHasError] = useState(false)
 const [message,setMessage] = useState(null)
 const [orderSubmitted,setOrderSubmitted] = useState(false)
 const navigate = useNavigate();

 const onSubmitHandler = async (data,event) => {
   event.preventDefault()
   // Getting Order Data from the respective contexts.
   const token = mealCtx.jwt
   const orderAddress = addressCtx.getOrderAddress()
   const userOrder = mealCtx.cartItems
   const totalAmount = mealCtx.totalAmount
   const user = mealCtx.getUser()

  const body={
    user:user,
    orderAddress:orderAddress,
    userOrder:userOrder,
    totalAmount:totalAmount,
    payment:{
      name:data.name,
      cardNumber:data.cardNumber,
      cvv:data.cvv,
      expiry:data.expiry,
      paymentMode:data.paymentMode
    }
  }
  console.log(body)
  
  const response = await fetch('http://localhost:8080/order',{
    method:'post',
    body:JSON.stringify(body),
    headers:{
      "Content-type":"application/json",
			'Access-Control-Allow-Origin':'*',
			"Accept": 'application/json',
      "Authorization":token
    }
  })

  const result = await response.json()
  console.log(result)
  setOrderSubmitted(true)
  if(response.ok){
    setMessage(result.message)
    setTimeout(()=>{
         mealCtx.clearCart()
         navigate('/ottomonMenu')
    },3000)
  }else{
    setMessage(result.message)
    setHasError(true)
  }

  reset()

 }

const closeHandler = (e) => {
  setOrderSubmitted(false)
  setHasError(false)
  setMessage(null)
}

  return (
    <React.Fragment>
          {orderSubmitted &&  <Stack sx={{ width: '100%' }} spacing={2}>
                                  <Alert onClose={closeHandler} severity={hasError?"error":"success"}>
                                  <AlertTitle>{hasError?"Error":"Success"}</AlertTitle>
                                     <strong>{message}</strong>
                                     {!hasError && <><br/><br/><b>Redirecting to the Home Page........</b></>}
                                  </Alert>
                              </Stack>}

        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              {...register("name",{required:"Name is Required",pattern:{
                value:/^[A-Za-z\s]*$/,
                message:"Name must contain only the alphabatic letters."
              },minLength:{
                value:4,
                message:"Name must be at least 4 letters long\]';/"
              }})}
            />
            <p style={{color:"yellow",fontSize:"10px"}}>{errors.name?.message}</p>
          </div>
          <div>
            <label htmlFor="cardNumber">Card Number:</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              {...register("cardNumber",{required:"Card Number is Required",minLength:{
                value:16,
                message:"Card Number length should be equal to 16."
              },pattern:{
                value:/^\d+$/,
                message:"Card number must contain all the numbers."
              }})}
            />
              <p style={{color:"yellow",fontSize:"10px"}}>{errors.cardNumber?.message}</p>
          </div>
          <div>
            <label htmlFor="expiry">Expiry (MM/YY):</label>
            <input
              type="text"
              id="expiry"
              name="expiry"
              placeholder="MM/YY"
              {...register("expiry",{required:"Card Expiry is Required",pattern:{
                value: /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/,
                message:"Please specify the card expiry in MM/YY format."
              }})}
            />
             <p style={{color:"yellow",fontSize:"10px"}}>{errors.expiry?.message}</p>
          </div>
          <div>
            <label htmlFor="cvv">CVV:</label>
            <input
              type="password"
              id="cvv"
              name="cvv"
              {...register("cvv",{required:"CVV is Required",minLength:{
                value:3,
                message:"CVV length should be equal to 3."
              },pattern:{
                value:/^\d+$/,
                message:"CVV number must contain all the numbers."
              }})}
            />
               <p style={{color:"yellow",fontSize:"10px"}}>{errors.cvv?.message}</p>
          </div>
          <div>
            <label htmlFor="paymentMode">Payment Mode:</label>
            <select
              id="paymentMode"
              name="paymentMode"
              {...register("paymentMode")}
            >
              <option value="credit">Credit</option>
              <option value="debit">Debit</option>
              <option value="mastercard">Mastercard</option>
            </select>
          </div>
          <button type="submit">Submit</button>
        </form>
      
      
    </React.Fragment>
  );
};

export default PaymentForm;

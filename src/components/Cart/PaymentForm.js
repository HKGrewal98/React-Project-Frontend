import React from "react";
import { useState, useContext } from "react";
import { AddressContext } from "../../store/AddressContext";
import mealContext from "../../store/MealItemContext";

const PaymentForm = () => {
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [paymentMode, setPaymentMode] = useState("credit");
  const [errorMessage, setErrorMessage] = useState("");
  const addressCtx = useState(AddressContext);
  const ctx = useContext(mealContext);
  const [successMessage, setSuccessMessage] = useState(null);

  const [formValidity, setFormValidity] = useState({
    name: true,
    cardNumber: true,
    expiry: true,
    cvv: true,
  });

  const [orderDone, setOrderDone] = useState(false);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleCardNumberChange = (event) => {
    setCardNumber(event.target.value);
  };

  const handleExpiryChange = (event) => {
    setExpiry(event.target.value);
  };

  const handleCvvChange = (event) => {
    setCvv(event.target.value);
  };

  const handlePaymentModeChange = (event) => {
    setPaymentMode(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setOrderDone(false);

    // Validate form data
    const isNameValid = name.trim() !== "";
    const isCardNumberValid =
      cardNumber.trim() === "" && cardNumber.trim().length === 16;
    const isExpiryValid = expiry.trim() === "" && expiry.trim().length === 5;
    const isCvvValid = cvv.trim() === "" && cvv.trim().length === 3;

    setFormValidity({
      name: isNameValid,
      cardNumber: isCardNumberValid,
      expiry: isExpiryValid,
      cvv: isCvvValid,
    });

    const isFormValid =
      isNameValid && isCardNumberValid && isExpiryValid && isCvvValid;

    // Submit form data
    if (isFormValid) {
      submitOrder(
        addressCtx.city,
        addressCtx.street,
        addressCtx.postal,
        addressCtx.houseNo,
        name,
        cardNumber,
        expiry,
        cvv,
        paymentMode
      );
    }
  };

  async function submitOrder(
    enteredCity,
    enteredStreet,
    enteredPostal,
    enteredhouseNo,
    name,
    cardNumber,
    expiry,
    cvv,
    paymentMode
  ) {
    const response = await fetch("http://localhost:8080/web/getToken", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
      },
      body: JSON.stringify({ clientId: "frontend" }),
    });

    const data = await response.json();
    console.log(data.accessToken);

    const body = {
      customerId: "12345",
      address: {
        city: enteredCity,
        street: enteredStreet,
        postalCode: enteredPostal,
        houseNo: enteredhouseNo,
      },
      totalAmount: ctx.totalAmount,
      isCompleted: true,
      order: ctx.cartItems,
      name: name,
      cardNumber: cardNumber,
      cardExpiry: expiry,
      cardCvv: cvv,
      modeOfPayment: paymentMode,
      dateOPayment: new Date(),
    };

    const submitResponse = await fetch("http://localhost:8080/order", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
        Authorization: data.accessToken,
      },
    });

    const submitResult = await submitResponse.json();

    console.log(submitResult);

    if (submitResult.status === "SUCCESS") {
      setOrderDone(true);
      setSuccessMessage(submitResult.message);
    }
  }
  return (
    <React.Fragment>
      {!orderDone && (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <div>
            <label htmlFor="cardNumber">Card Number:</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={cardNumber}
              onChange={handleCardNumberChange}
            />
          </div>
          <div>
            <label htmlFor="expiry">Expiry (MM/YY):</label>
            <input
              type="text"
              id="expiry"
              name="expiry"
              value={expiry}
              placeholder="MM/YY"
              onChange={handleExpiryChange}
            />
          </div>
          <div>
            <label htmlFor="cvv">CVV:</label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              value={cvv}
              onChange={handleCvvChange}
            />
          </div>
          <div>
            <label htmlFor="paymentMode">Payment Mode:</label>
            <select
              id="paymentMode"
              name="paymentMode"
              value={paymentMode}
              onChange={handlePaymentModeChange}
            >
              <option value="credit">Credit</option>
              <option value="debit">Debit</option>
              <option value="mastercard">Mastercard</option>
            </select>
          </div>
          {errorMessage && <p>{errorMessage}</p>}
          <button type="submit">Submit</button>
        </form>
      )}
      {orderDone && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            This is a success alert — <strong>{successMessage}</strong>
          </Alert>
          <div className={classes.actions}>
            <button type="button" onClick={props.onCancel}>
              Wuhoo
            </button>
          </div>
        </Stack>
      )}
    </React.Fragment>
  );
};

export default PaymentForm;

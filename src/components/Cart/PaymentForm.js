import React, { useState } from "react";

const PaymentForm = () => {
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [paymentMode, setPaymentMode] = useState("credit");
  const [errorMessage, setErrorMessage] = useState("");

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

    // Validate form data
    if (name.trim() === "" || cardNumber.trim() === "" || expiry.trim() === "" || cvv.trim() === "") {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    if (cardNumber.trim().length !== 16) {
      setErrorMessage("Please enter a valid 16-digit card number.");
      return;
    }

    if (expiry.trim().length !== 5) {
      setErrorMessage("Please enter a valid expiry date (MM/YY).");
      return;
    }

    if (cvv.trim().length !== 3) {
      setErrorMessage("Please enter a valid 3-digit CVV number.");
      return;
    }

    // Submit form data
    setErrorMessage("");
    console.log("Name:", name);
    console.log("Card number:", cardNumber);
    console.log("Expiry:", expiry);
    console.log("CVV:", cvv);
    console.log("Payment mode:", paymentMode);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={name} onChange={handleNameChange} />
      </div>
      <div>
        <label htmlFor="cardNumber">Card Number:</label>
        <input type="text" id="cardNumber" name="cardNumber" value={cardNumber} onChange={handleCardNumberChange} />
      </div>
      <div>
        <label htmlFor="expiry">Expiry (MM/YY):</label>
        <input type="text" id="expiry" name="expiry" value={expiry} onChange={handleExpiryChange} />
      </div>
      <div>
        <label htmlFor="cvv">CVV:</label>
        <input type="text" id="cvv" name="cvv" value={cvv} onChange={handleCvvChange} />
      </div>
      <div>
        <label htmlFor="paymentMode">Payment Mode:</label>
        <select id="paymentMode" name="paymentMode" value={paymentMode} onChange={handlePaymentModeChange}>
          <option value="credit">Credit</option>
          <option value="debit">Debit</option>
          <option value="mastercard">Mastercard</option>
        </select>
      </div>
      {errorMessage && <p>{errorMessage}</p>}
      <button type="submit">Submit</button>
    </form>
  );
};


export default PaymentForm;
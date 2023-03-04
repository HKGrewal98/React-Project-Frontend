import React, { createContext, useState } from "react";

// create a context with initial values
export const AddressContext = createContext({
  city: "",
  street: "",
  postal: "",
  houseNo: "",
  setCity: (city) => {},
  setStreet: (street) => {},
  setPostal: (postal) => {},
  setHouseNo: (houseNo) => {},
});

const AddressContextProvider = ({ children }) => {
  // define state for each value
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [houseNo, setPostal] = useState("");
  const [postal, setHouseNo] = useState("");

  // create an object with all the values and functions to update them
  const contextValues = {
    city,
    street,
    houseNo,
    postal,
    setCity,
    setStreet,
    setPostal,
    setHouseNo,
  };

  // pass the context object to the Context Provider
  return (
    <AddressContext.Provider value={contextValues}>
      {children}
    </AddressContext.Provider>
  );
};

export default AddressContextProvider;

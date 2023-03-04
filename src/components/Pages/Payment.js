import { Link } from "react-router-dom";
import PaymentForm from "../Cart/PaymentForm";

export default function Payment() {
  return (
    <div style={{ color: "red", marginTop: "100px" }}>
      <div className="container">
        <div className="form-section">
          <PaymentForm />
        </div>
      </div>
      <Link to="/ottomonMenu">Main Page</Link>
    </div>
  );
}

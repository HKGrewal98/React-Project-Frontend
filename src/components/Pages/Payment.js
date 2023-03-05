import PaymentForm from "../Cart/PaymentForm";
import classes from "./Payment.module.css";

export default function Payment() {
  return (
    <div style={{ color: "red", marginTop: "100px" }}>
      <div className={classes.payment_container}>
        <div className="form-section">
          <PaymentForm />
        </div>
      </div>
    </div>
  );
}

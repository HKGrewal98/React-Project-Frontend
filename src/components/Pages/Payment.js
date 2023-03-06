import PaymentForm from "../Cart/PaymentForm";
import "bootstrap/dist/css/bootstrap.css";
import classes from "./Payment.module.css";

export default function Payment() {
  return (
    <div className={`container p-0 body w-50 title ${classes.title}`}>
      <div class="card px-4 d-flex justify-content-center">
        <p class="h6 py-3 m-auto fs-2 fw-bolder">Payment Details</p>
        <PaymentForm />
      </div>
    </div>
  );
}

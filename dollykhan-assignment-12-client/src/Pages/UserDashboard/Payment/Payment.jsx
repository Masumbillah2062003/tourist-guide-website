import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../Component/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";

const Payment = ({
  setOpen,
  refetch,
  handleClose,
  bookingPrice,
  bookingId,
  bookingPackageName,
  bookingStatus,
}) => {
  const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
  return (
    <div>
      <div>
        <SectionTitle headingTitle="Payment"></SectionTitle>
      </div>
      <div>
        <Elements stripe={stripePromise}>
          <CheckOutForm
            setOpen={setOpen}
            refetch={refetch}
            handleClose={handleClose}
            bookingPrice={bookingPrice}
            bookingId={bookingId}
            bookingPackageName={bookingPackageName}
            bookingStatus={bookingStatus}
          ></CheckOutForm>
        </Elements>
      </div>
    </div>
  );
};

export default Payment;

import React, { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import { useNavigate } from "react-router-dom";
import { PAYMENT } from "../mutations/paymentMutation";
import { useMutation } from "@apollo/client";

const Donate = () => {
  const [donateamount, setDonateAmont] = useState(null);

  const navigate = useNavigate();
  const [token, setToken] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add logic to handle form submission
  };

  const [payment, { data, loading, error }] = useMutation(PAYMENT, {
    onCompleted: (data) => {
      navigate("/");
    },
    onError: (error) => {
      console.error("Error registering user:", error);
      // Handle the error, display a message to the user, or perform other actions
    },
  });

  const handlePayment = async () => {
    try {
      const { data } = await payment({
        variables: { tokenId: token.id, amount: donateamount * 100 },
      });

      console.log("Payment processed successfully:", data);
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  useEffect(() => {
    handlePayment();
  }, [token]);

  const onToken = (token) => {
    setToken(token);
    console.log(token);
  };

  const KEY =
    "pk_test_51OmmzbA0o39JMyyKbuIuheiMwrTSf4iR3GG1g0QZSGaHFxHuaD5cCmUjWz9lOnkDJaXmY50RouTmYjtwce1oPMMU00fGkoiy27";

  if (loading) return <h1 className=" text-center">Loading...</h1>;

  if (error) return <h1 className=" text-center">{error.message}</h1>;

  return (
    <div className="px-[10px] md:px-[20px] lg:px-[10%]">
      <p className="lg:mx-[20%] text-center ">
        Every contribution, no matter the size, makes a meaningful impact. Your donation helps us continue our mission of perserving our culture. 
        Please Enter your donation amount below. Thank you for your support!
      </p>

      <section className="">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 mt-5">
          <div className="w-full border bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Enter Amount
                  </label>
                  <input
                    type="number"
                    name="amount"
                    id="amount"
                    value={donateamount}
                    onChange={(e) => setDonateAmont(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-orange-600 outline-orange-600 focus:border-orange-600 block w-full p-2.5"
                    placeholder="$"
                    required
                  />
                </div>

                <StripeCheckout
                  name="Nao Long Xiong" // the pop-in header title
                  description="Xiong Customs" // the pop-in header subtitle
                  image="/XClogo.png"
                  billingAddress
                  shippingAddress
                  token={onToken}
                  stripeKey={KEY}
                  amount={donateamount * 100}
                >
                  <button
                    // onClick={gotoPaymentHandler}
                    type="submit"
                    className="w-full uppercase text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-3"
                  >
                    Pay With Stripe
                  </button>
                </StripeCheckout>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Donate;

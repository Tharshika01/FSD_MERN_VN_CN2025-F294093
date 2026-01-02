import API from "../services/api";

export default function Payment() {

  const placeOrder = async () => {
  alert("Order already placed 🎉");
  window.location.href = "/orders";
};


  return (
    <div className="container mt-5 text-center">
      <h2>Dummy Payment Page</h2>
      <p>Click below to confirm payment</p>

      <button className="btn btn-success" onClick={placeOrder}>
        Place Order
      </button>
    </div>
  );
}

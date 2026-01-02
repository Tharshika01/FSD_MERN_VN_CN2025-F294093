import React, { useEffect, useState, useContext } from 'react';
import '../../styles/Cart.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GeneralContext } from '../../context/GeneralContext';

const Cart = () => {
  const { cartCount, setCartCount } = useContext(GeneralContext);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };

      const response = await axios.get(
        'http://localhost:8000/api/cart/fetch-cart',
        config
      );

      const items = Array.isArray(response.data) ? response.data : [];
      setCartItems(items);

      const count = items.reduce(
        (acc, item) => acc + (parseInt(item.quantity) || 0),
        0
      );
      setCartCount(count);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (itemId) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };

      await axios.delete(
        `http://localhost:8000/api/cart/remove-item/${itemId}`,
        config
      );

      fetchCart();
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [deliveryCharges, setDeliveryCharges] = useState(0);

  useEffect(() => {
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const discount = cartItems.reduce(
      (sum, item) => sum + ((item.price * item.discount) / 100) * item.quantity,
      0
    );

    setTotalPrice(total);
    setTotalDiscount(Math.floor(discount));
    setDeliveryCharges(total > 1000 || cartItems.length === 0 ? 0 : 50);
  }, [cartItems]);

  // Checkout states
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const placeOrder = async () => {
    if (cartItems.length === 0) return;

    try {
      await axios.post('http://localhost:8000/api/orders/place-cart-order', {
        userId: localStorage.getItem('userId'),
        name,
        mobile,
        email,
        address,
        pincode,
        paymentMethod,
        orderDate: new Date(),
      });

      alert('Order placed successfully!');
      navigate('/profile');
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  if (loading)
    return <p style={{ textAlign: 'center', marginTop: '20vh' }}>Loading cart...</p>;

  return (
    <div className="cartPage">
      {/* CART ITEMS */}
      <div className="cartContents">
        {cartItems.length === 0 && (
          <p style={{ textAlign: 'center', marginTop: '20vh' }}>
            Cart is empty...
          </p>
        )}

        {cartItems.map((item) => (
          <div className="cartItem" key={item._id}>
            <img src={item.mainImg} alt={item.title} />
            <div className="cartItem-data">
              <h4>{item.title}</h4>
              <p>{item.description}</p>

              <div className="cartItem-inputs">
                <span><b>Size:</b> {item.size}</span>
                <span><b>Qty:</b> {item.quantity}</span>
              </div>

              <h5>
                ₹ {parseInt(item.price - (item.price * item.discount) / 100) * item.quantity}
              </h5>

              <button className="btn" onClick={() => removeItem(item._id)}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* PRICE + CHECKOUT */}
      <div className="cart-layout">

        {/* PRICE DETAILS */}
        <div className="cartPriceBody">
          <h4>Price Details</h4>

          <p><b>Total MRP:</b> ₹ {totalPrice}</p>
          <p style={{ color: 'green' }}>
            <b>Discount:</b> - ₹ {totalDiscount}
          </p>
          <p style={{ color: 'red' }}>
            <b>Delivery:</b> + ₹ {deliveryCharges}
          </p>

          <hr />

          <h4>
            Final Price: ₹ {totalPrice - totalDiscount + deliveryCharges}
          </h4>
        </div>

        {/* CHECKOUT */}
        <div className="checkout-section">
          <h4>Checkout</h4>

          <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
          <input placeholder="Mobile" value={mobile} onChange={e => setMobile(e.target.value)} />
          <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <input placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} />
          <input placeholder="Pincode" value={pincode} onChange={e => setPincode(e.target.value)} />

          <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}>
            <option value="">Select Payment Method</option>
            <option value="cod">Cash on Delivery</option>
            <option value="upi">UPI</option>
            <option value="card">Card</option>
          </select>

          <button onClick={placeOrder}>Place Order</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;

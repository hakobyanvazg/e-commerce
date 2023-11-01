import { Link, useNavigate } from "react-router-dom";
import cartStyle from "./style.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  clearCart,
  decreaseCart,
  getTotals,
  removeFromCart,
} from "../../slices/cart.slice";
import { useEffect } from "react";
import PayButton from "../PayButton";
const Cart = () => {
  
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeFromCart(cartItem));
  };
  const handleDecreaseCart = (cartItem) => {
    dispatch(decreaseCart(cartItem));
  };
  const handleIncreaseCart = (cartItem) => {
    dispatch(addToCart(cartItem));
  };
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  return (
    <div className={cartStyle.cart_container}>
      <h2>Shopping Cart</h2>
      {cart.cartItems.length === 0 ? (
        <div className={cartStyle.cart_empty}>
          <p>Your cart is currently empty</p>
          <div className={cartStyle.start_shopping}>
            <Link to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-arrow-left"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                />
              </svg>
              <span>Start Shopping</span>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className={cartStyle.titles}>
            <h3 className={cartStyle.product_title}>Product</h3>
            <h3 className={cartStyle.price}>Price</h3>
            <h3 className={cartStyle.quantity}>Quantity</h3>
            <h3 className={cartStyle.total}>Total</h3>
          </div>
          <div className={cartStyle.cart_items}>
            {cart.cartItems?.map((cartItem) => (
              <div className={cartStyle.cart_item} key={cartItem._id}>
                <div className={cartStyle.cart_product}>
                  <img src={cartItem.image.url} alt={cartItem.name} />
                  <div>
                    <h3>{cartItem.name}</h3>
                    <p>{cartItem.desc}</p>
                    <button onClick={() => handleRemoveFromCart(cartItem)}>
                      Remove
                    </button>
                  </div>
                </div>
                <div className={cartStyle.cart_product_price}>
                  ${cartItem.price}
                </div>
                <div className={cartStyle.cart_product_quantity}>
                  <button onClick={() => handleDecreaseCart(cartItem)}>
                    -
                  </button>
                  <div className={cartStyle.count}>{cartItem.cartQuantity}</div>
                  <button onClick={() => handleIncreaseCart(cartItem)}>
                    +
                  </button>
                </div>
                <div className={cartStyle.cart_product_total_price}>
                  ${cartItem.price * cartItem.cartQuantity}
                </div>
              </div>
            ))}
          </div>
          <div className={cartStyle.cart_summary}>
            <button
              className={cartStyle.clear_cart}
              onClick={() => handleClearCart()}
            >
              Clear Cart
            </button>
            <div className={cartStyle.cart_checkout}>
              <div className={cartStyle.subtotal}>
                <span>Subtotal</span>
                <span className={cartStyle.amount}>
                  ${cart.cartTotalAmount}
                </span>
              </div>
              <p>Taxes and shipping calculated at checkout</p>
              {auth._id ? (
                <PayButton cartItems={cart.cartItems} />
              ) : (
                <button
                  className={cartStyle.cart_login}
                  onClick={() => navigate("/login")}
                >
                  Login to Check out
                </button>
              )}
              <div className={cartStyle.continue_shopping}>
                <Link to="/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-arrow-left"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                    />
                  </svg>
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

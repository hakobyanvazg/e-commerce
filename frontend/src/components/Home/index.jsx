import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import homeStyle from "./style.module.css";
import { addToCart } from "../../slices/cart.slice";
import { Link } from "react-router-dom";

const Home = () => {
  const { items: data, status } = useSelector((state) => state.products);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate("/cart");
  };
  return (
    <div className={homeStyle.home_container}>
      {status === "success" ? (
        <>
          <h2>New Arrivals</h2>
          <div className={homeStyle.products}>
            {data &&
              data?.map((product) => (
                <div key={product._id} className={homeStyle.product}>
                  <h3>{product.name}</h3>
                  <Link to={`/product/${product._id}`}>
                    <img src={product.image.url} alt={product.name} />
                  </Link>
                  <div className={homeStyle.details}>
                    <span>{product.desc}</span>
                    <span className={homeStyle.price}>${product.price}</span>
                  </div>
                  <button onClick={() => handleAddToCart(product)}>
                    Add To Cart
                  </button>
                </div>
              ))}
          </div>
        </>
      ) : status === "pending" ? (
        <p>Loading...</p>
      ) : (
        <p>Unexpected error occured...</p>
      )}
    </div>
  );
};

export default Home;

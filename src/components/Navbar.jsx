import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  /**
   * - useSelectore() used to subscribe state
   *  - state in useSelector((state) => state.cart) is global state of redux store
   *    from which we want state of cart
   * - it's publish-subscribe(pub-sub) model, 
   *    once you susbscribe to any state then if state change then component will render automatically
   * 
   */
  const items = useSelector((state) => state.cart);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <span className="logo">REDUX STORE</span>
      <div>
        <Link className="navLink" to="/">
          Home
        </Link>
        <Link className="navLink" to="/cart">
          Cart
        </Link>
        <span className="cartCount">Cart items: {items.length}</span>
      </div>
    </div>
  );
};

export default Navbar;

import React, { useContext, useEffect, useState } from "react";
import logo from "../images/enactus-logo-gray.png";
import { Link } from "react-router-dom";
import { auth, db } from "../Config/Config";
import { Icon } from "react-icons-kit";
import { cart } from "react-icons-kit/entypo/cart";
import { useHistory } from "react-router-dom";
import { CartContext } from "../Global/CartContext";

export const Navbar = () => {
  const history = useHistory();
  const { totalQty } = useContext(CartContext);
  const [currentUser, setCurrentUser] = useState(null);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    // Set up an observer on the Auth object
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        db.collection("SignedUpUsersData")
          .doc(user.uid)
          .get()
          .then((snapshot) => {
            const userData = snapshot.data();
            if (userData) {
              setCurrentUser(userData.Name); // Update the current user state with the name of the logged in user.
              console.log(
                "Hey " +
                  userData.Name +
                  "! 👋 Welcome to Enactus VITC E-Commerce Site ❤️ "
              );
            }
          });
      } else {
        // No user is signed in.
        setCurrentUser(null);
      }
    });

    // Clean up the observer when the component unmounts
    return () => unsubscribe();
  }, []);

  // handle logout
  const handleLogout = () => {
    auth.signOut().then(() => {
      history.push("/login");
    });
  };

  const handleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="navbox">
      <div className="mobile-nav">
        <Link to="/" className="logo">
          <img src={logo} alt="Enactus Logo" />
        </Link>

        <div className="menu-buttons" onClick={handleMenu}>
          {!isOpen && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className={`menu-icon `}
            >
              <rect x="2" y="5" width="20" height="2" />
              <rect x="2" y="11" width="18" height="2" />
              <rect x="2" y="17" width="16" height="2" />
            </svg>
          )}

          {isOpen && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className={`menu-icon `}
            >
              <path d="M19.59 6L12 13.59L4.41 6L3 7.41L10.59 15L3 22.59L4.41 24L12 16.41L19.59 24L21 22.59L13.41 15L21 7.41L19.59 6Z" />
            </svg>
          )}
        </div>
      </div>

      <div className="desktop-nav-menu">
        <Link to="/" className="text-3xl font-bold text-black">
          {/* <img src={logo} alt="Enactus Logo" /> */}
          SNOWYMART
        </Link>
      </div>

      {currentUser && isOpen && (
        <div className="rightside">
          <span>
            <Link
              to="http://localhost:3000/index.html"
              className="navlink sign-up mr-6"
            >
              Track Product
            </Link>
            <Link to="/" className="navlink current-user">
              {currentUser}
            </Link>
          </span>
          <span>
            <Link to="cart" className="navlink">
              <Icon icon={cart} className="cart" />
              <span className="no-of-products">{totalQty}</span>
            </Link>
          </span>
          <span>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </span>
        </div>
      )}
      {!currentUser && isOpen && (
        <div className="rightside">
          <span>
            <Link
              to="http://localhost:3000/index.html"
              className="navlink sign-up"
            >
              Track Product
            </Link>
            <Link to="signup" className="navlink sign-up">
              SIGN UP
            </Link>
          </span>
          <span>
            <Link
              to="http://localhost:3000/index.html"
              className="navlink sign-up"
            >
              Track Product
            </Link>
            <Link to="login" className="navlink login">
              LOGIN
            </Link>
          </span>
        </div>
      )}
    </div>
  );
};

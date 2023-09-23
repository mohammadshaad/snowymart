import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { ProductsContext } from "../Global/ProductsContext";
import { CartContext } from "../Global/CartContext";
import { Loader } from "./Loader";
import { useAuth } from "../Global/AuthContext"; // Assuming you have the AuthContext set up
import ProductNotFound from "../images/productnotfound.png";

export const Products = () => {
  const { products } = useContext(ProductsContext);
  const { dispatch } = useContext(CartContext);
  const { currentUser, login } = useAuth();

  const history = useHistory();

  const [selectedFilter, setSelectedFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [displayedProductCount, setDisplayedProductCount] = useState(4);

  const filteredProducts = products.filter((product) => {
    const productNameLower = product.ProductName.toLowerCase();
    return (
      (selectedFilter === "" || product.ProductType === selectedFilter) &&
      productNameLower.includes(searchTerm.toLowerCase())
    );
  });

  const loadMoreProducts = () => {
    setDisplayedProductCount(displayedProductCount + 4);
    if (displayedProductCount + 4 > filteredProducts.length) {
      history.push("/products");
    }
  };

  const addToCart = (product) => {
    if (currentUser) {
      dispatch({
        type: "ADD_TO_CART",
        id: product.ProductID,
        product,
      });
    } else {
      history.push("/login");
      login("your-email@example.com", "your-password");
    }
  };

  return (
    <div className="products-main-container">
      <div className="products-wrapper">
        <h1>Products</h1>
        <div className="filters">
          <input
            type="text"
            placeholder="Search products"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-box"
          />
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="Inara">Inara</option>
            <option value="Naari">Naari</option>
            <option value="Malar">Malar</option>
            <option value="Pooranya">Pooranya</option>
          </select>
        </div>
        <div className="products-container">
          {filteredProducts.length === 0 ? (
            <div className="text-gray-400 font-light text-2xl flex-col flex items-center justify-center">
              <img src={ProductNotFound} alt="" className="w-96 mx-auto" />
              No products to display.
            </div>
          ) : (
            filteredProducts.slice(0, displayedProductCount).map((product) => (
              <div className="product-card" key={product.ProductID}>
                <div className="product-img">
                  <img src={product.ProductImg} alt="not found" />
                </div>
                <div className="product-name">{product.ProductName}</div>
                <div className="product-price">
                  Rs {product.ProductPrice}.00
                </div>
                <div className="text-green-500 text-center w-full">Verified ✔</div>
                <button
                  className="addcart-btn"
                  onClick={() => addToCart(product)}
                >
                  ADD TO CART
                </button>
              </div>
            ))
          )}
        </div>
        {displayedProductCount < filteredProducts.length && (
          <button className="see-more-btn" onClick={loadMoreProducts}>
            See More
          </button>
        )}
      </div>
    </div>
  );
};

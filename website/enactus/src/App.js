import React, { Component } from "react";
import { ProductsContextProvider } from "./Global/ProductsContext";
import { Home } from "./Components/Home";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Signup } from "./Components/Signup";
import { Login } from "./Components/Login";
import { NotFound } from "./Components/NotFound";
import { auth, db } from "./Config/Config";
import { CartContextProvider } from "./Global/CartContext";
import { Cart } from "./Components/Cart";
import { AddProducts } from "./Components/AddProducts";
import { Cashout } from "./Components/Cashout";
import { Landing } from "./Components/Landing";
import StripeContainer from "./Components/StripeContainer";
import Payment from "./Components/PaymentForm";
import Success from "./Components/Success";
export class App extends Component {
  state = {
    user: null,
  };

  componentDidMount() {
    // getting user info for navigation bar
    auth.onAuthStateChanged((user) => {
      if (user) {
        db.collection("SignedUpUsersData")
          .doc(user.uid)
          .get()
          .then((snapshot) => {
            const userData = snapshot.data();
            if (userData) {
              this.setState({
                user: userData.Name,
              });
            }
          });
      } else {
        this.setState({
          user: null,
        });
      }
    });
  }

  render() {
    return (
      <ProductsContextProvider>
        <CartContextProvider>
          <BrowserRouter>
            <Switch>
              {/* landing page */}
              <Route
                exact
                path="/"
                component={() => <Landing user={this.state.user} />}
              />

              {/* products */}
              <Route
                path="/products"
                component={() => <Home user={this.state.user} />}
              />
              {/* signup */}
              <Route path="/signup" component={Signup} />
              {/* login */}
              <Route path="/login" component={Login} />
              {/* cart products */}
              <Route
                path="/cart"
                component={() => <Cart user={this.state.user} />}
              />
              <Route
                path="/payment"
                component={() => <StripeContainer user={this.state.user} />}
              />
              <Route path="/completion" element={<Success />} />

              {/* add products */}
              {/* <Route path="/addproducts" component={AddProducts} /> */}
              {/* cashout */}
              <Route
                path="/cashout"
                component={() => <Cashout user={this.state.user} />}
              />
              <Route component={NotFound} />
            </Switch>
          </BrowserRouter>
        </CartContextProvider>
      </ProductsContextProvider>
    );
  }
}

export default App;

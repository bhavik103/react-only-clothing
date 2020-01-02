import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/hompage/homepage.component";
import ShopPage from "./pages/shop/shop.component";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/shop" component={ShopPage} />
      </div>
    </BrowserRouter>
  );
}

export default App;

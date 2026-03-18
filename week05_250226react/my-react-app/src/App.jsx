import React, { useState } from "react";
import { Coffee, Pizza, Sandwich, ShoppingCart } from "lucide-react";
import "./App.css";

function App() {
  const menu = [
    { id: 1, name: "Veg Sandwich", price: 40, icon: <Sandwich size={20} /> },
    { id: 2, name: "Pizza Slice", price: 80, icon: <Pizza size={20} /> },
    { id: 3, name: "Cold Coffee", price: 60, icon: <Coffee size={20} /> },
    { id: 4, name: "Burger", price: 70, icon: <Sandwich size={20} /> },
  ];

  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{ fontFamily: "Arial", padding: "20px" }}>
      <h1>☕ Agnel Cafeteria</h1>

      <h2>Menu</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 200px)", gap: "15px" }}>
        {menu.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "10px",
              textAlign: "center",
            }}
          >
            <div>{item.icon}</div>
            <h3>{item.name}</h3>
            <p>₹{item.price}</p>
            <button onClick={() => addToCart(item)}>Add</button>
          </div>
        ))}
      </div>

      <h2 style={{ marginTop: "30px" }}>
        <ShoppingCart size={20} /> Cart
      </h2>

      {cart.length === 0 ? (
        <p>No items selected</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              {item.name} - ₹{item.price}
            </li>
          ))}
        </ul>
      )}

      <h3>Total: ₹{total}</h3>
    </div>
  );
}

export default App;
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './components/HomePage'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import OrderTracking from './components/OrderTracking'
import { CartProvider } from './context/CartContext'
import ProductDetails from './components/ProductDetails'
import AddressForm from './components/AddressForm'
import DeliveryTracking from './components/Delivery'

const App: React.FC = () => {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/tracking" element={<OrderTracking />} />
          <Route path="/address" element={<AddressForm />} />
          <Route path="/delivery" element={<DeliveryTracking />} />
          <Route
            path="/productDetails/:productId"
            element={<ProductDetails />}
          />
        </Routes>
      </Router>
    </CartProvider>
  )
}

export default App

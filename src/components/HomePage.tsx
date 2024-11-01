import React from 'react'
import { Link } from 'react-router-dom'
import { products } from '../mocks/data'
import { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import Header from './Header'
import Items from './Items'
import Footer from './Footer'

const HomePage: React.FC = () => {
  const cartContext = useContext(CartContext)

  if (!cartContext) {
    throw new Error(
      'CartContext is undefined. Please ensure CartProvider wraps HomePage.'
    )
  }

  return (
    <div>
      <Header />
      <div className="px-3">
        <h1 className="text-2xl font-bold text-center text-gray-50 mb-4">
          Menu de Pizzas
        </h1>
        <div className="grid gap-4 ">
          {products.map((product) => (
            <Items key={product.id} product={product} isCart={false} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default HomePage

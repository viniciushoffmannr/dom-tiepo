import React from 'react'
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
      <div className="px-3 mb-24">
        <h1 className="text-2xl font-bold text-center text-gray-50 mb-4">
          Menu de Pizzas
        </h1>
        <div className="grid gap-4 ">
          <div className="border rounded border-red-500 bg-zinc-300 p-2 flex flex-col sm:flex-row sm:items-center gap-1">
            <p className="font-bold text-sm whitespace-nowrap">
              Sobre nossa massa:
            </p>
            <p className="text-sm">Farinha, sal, açúcar, fermento e água</p>
          </div>

          {products.map((product) => (
            <Items key={product.id} product={product} isCart={false} />
          ))}
        </div>
        <h2 className="text-gray-50 text-center text-xl mt-4">
          Selecione uma pizza doce e uma salgada para fazer um combo e ganhar
          desconto!
        </h2>
      </div>
      <Footer />
    </div>
  )
}

export default HomePage

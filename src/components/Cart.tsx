import React, { useContext, useState } from 'react'
import { CartContext } from '../context/CartContext'
import { products } from '../mocks/data'
import Items from './Items'
import { useNavigate } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'

const Cart: React.FC = () => {
  const { cartItems, totalPrice } = useContext(CartContext)!
  const [observationArea, setObservationArea] = useState<string>('')
  const navigate = useNavigate()

  return (
    <div>
      <Header />

      {cartItems.length === 0 ? (
        <p className="text-red-600">Seu carrinho está vazio.</p>
      ) : (
        <div className="p-2 gap-3 flex flex-col">
          {cartItems.map((item) => (
            <Items product={item} key={item.description} isCart />
          ))}

          <textarea
            className="border w-full border-red-500 p-2 rounded-md  focus:outline-none focus:ring-2 focus:ring-red-500"
            value={observationArea}
            onChange={(e) => setObservationArea(e.target.value)}
            placeholder="Alguma observação? Ex tirar cebola, etc."
            rows={2}
          />
          <div className="flex justify-between items-center font-bold text-lg">
            <span className="font-bold text-white">Total:</span>
            <span className="font-bold text-red-600">
              R$ {totalPrice.toFixed(2)}
            </span>
          </div>

          <div className="flex flex-col gap-3 items-center w-full mt-5">
            <button
              onClick={() => navigate('/address')}
              type="button"
              className="bg-red-600 w-5/6 rounded p-2"
            >
              <p className="font-bold text-white">Concluir</p>
            </button>

            <button
              onClick={() => navigate('/')}
              type="button"
              className="bg-gray-400 w-5/6 rounded p-2"
            >
              <p className="font-bold text-white">Cancelar</p>
            </button>
          </div>

          <Footer />
        </div>
      )}
    </div>
  )
}

export default Cart

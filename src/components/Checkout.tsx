import React, { useContext, useState } from 'react'
import { Address } from './AddressForm'
import { products } from '../mocks/data'
import Items from './Items'
import CardForm from './CardForm'
import pixImage from '../assets/PIX.png'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../context/CartContext'

const Checkout: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState<'cartao' | 'pix'>('pix')

  const { cartItems } = useContext(CartContext)!
  const navigate = useNavigate()
  let address: Address | null = null

  const storedAddress = localStorage.getItem('address')
  if (storedAddress) {
    address = JSON.parse(storedAddress) as Address
  }

  const handleSubmit = () => {
    navigate('/delivery')
  }

  return (
    <div className="p-4">
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-bold mb-4 text-white">Checkout</h2>
        {cartItems.map((item) => (
          <Items product={item} isCheckout />
        ))}

        {address && (
          <div className="border cursor-pointer rounded bg-zinc-300 border-red-500 p-4 gap-3">
            <p className="font-semibold text-center text-red-500">
              Endereço de entrega:
            </p>
            <span>
              <p className="text-gray-600 text-sm">
                {address.street}, {address.neighborhood}, {address.city},{' '}
                {address.number}
              </p>
            </span>
          </div>
        )}
      </div>
      <div className="mt-3 border cursor-pointer mb-3 rounded bg-zinc-300 border-red-500 p-4 ">
        <label className="font-semibold text-center text-red-500 mb-2">
          Forma de pagamento
        </label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value as 'cartao' | 'pix')}
          className="w-full border rounded p-2"
        >
          <option value="cartao">Cartão</option>
          <option value="pix">Pix</option>
        </select>

        {paymentMethod === 'cartao' ? (
          <CardForm />
        ) : (
          <div className="flex flex-col items-center mt-3">
            <img src={pixImage} className="w-40 h-40" />
            <p>Escaneie o QR Code</p>
          </div>
        )}
      </div>
      <button
        onClick={handleSubmit}
        className="w-full bg-green-500 mt-3 text-white py-2 px-4 rounded hover:bg-green-600"
      >
        Finalizar Pedido
      </button>
    </div>
  )
}

export default Checkout

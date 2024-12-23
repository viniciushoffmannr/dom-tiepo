import React, { useContext, useState } from 'react'
import { CartContext, Product } from '../context/CartContext'
import { products } from '../mocks/data'
import marguerita from '../assets/marguerita.jpg'
import morango from '../assets/morango.jpg'
import carne from '../assets/carne.webp'

import { useNavigate, useParams } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

const ProductDetails: React.FC = () => {
  const { productId } = useParams<{ productId: string }>()
  const product = products.find((item) => item.id === Number(productId))
  const [selectedValue, setSelectedValue] = useState<number | ''>(1)
  const { addToCart } = useContext(CartContext)!

  let imagePath = ''

  switch (productId) {
    case '1':
      imagePath = marguerita
      break

    case '2':
      imagePath = carne
      break

    case '3':
      imagePath = morango
      break

    default:
      break
  }

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(Number(event.target.value))
  }

  const navigate = useNavigate()

  const handleAddToCart = () => {
    if (product) {
      const currentProduct: Product = {
        id: product.id!,
        name: product.name || 'Default Name',
        price: product.price || 0,
        description: product.description || 'Default Description',
        quantity: selectedValue || 1,
      }
      addToCart(currentProduct)
      navigate('/')
    }
  }

  if (!product) return <p>Produto não encontrado.</p>

  return (
    <div>
      <Header />
      <div className="px-3">
        <div className="border bg-white rounded border-red-500 p-4 flex flex-col  items-center">
          <img src={imagePath} alt="Pizza" className="w-32 h-32" />
          <h1 className="text-red-500 text-xl mt-2 font-bold text-center">
            {product.name}
          </h1>

          <div className="flex items-center mt-2">
            <select
              id="custom-select"
              value={selectedValue}
              onChange={handleChange}
              className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecione a quantidade</option>

              {Array.from({ length: 10 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>

          <div className="justify-between flex w-full mt-2">
            <p className=" from-neutral-500 text-lg font-semibold">Total</p>
            <p className=" text-red-500 text-lg font-semibold">
              R${' '}
              {selectedValue
                ? (product.price * selectedValue).toFixed(2)
                : product.price.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 items-center w-full mt-5">
        <button
          onClick={handleAddToCart}
          type="button"
          className="bg-red-600 w-5/6 rounded p-2"
        >
          <p className="font-bold text-white">Adicionar ao carrinho</p>
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
  )
}

export default ProductDetails

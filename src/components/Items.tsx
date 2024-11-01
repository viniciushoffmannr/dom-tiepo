import { Product } from '../context/CartContext'
import pizzaImage from '../assets/pizza.jpeg'
import { useNavigate } from 'react-router-dom'
import { CiCirclePlus } from 'react-icons/ci'
import { CiCircleMinus } from 'react-icons/ci'
import { useContext } from 'react'
import { CartContext } from '../context/CartContext'

interface ItemsProps {
  product: Product
  isCart?: boolean
  isCheckout?: boolean
}

const Items: React.FC<ItemsProps> = ({
  product,
  isCart = false,
  isCheckout = false,
}) => {
  const navigate = useNavigate()

  const { updateQuantity } = useContext(CartContext)!

  return (
    <div
      onClick={() =>
        !isCart && !isCheckout && navigate(`ProductDetails/${product.id}`)
      }
      className="border cursor-pointer rounded border-red-500 bg-zinc-300 p-4 flex gap-3 items-center"
    >
      <img src={pizzaImage} alt="pizza" className="w-16 h-16" />
      <div className="w-full flex justify-between">
        <div>
          <h1 className="text-red-500 font-semibold mb-1">{product.name}</h1>
          <p className="text-gray-600 text-sm w-8/12">{product.description}</p>
        </div>
        <div>
          <h1 className="text-red-500 font-semibold mb-1">
            R$ {product.price.toFixed(2)}
          </h1>

          {(isCart || isCheckout) && (
            <div className="mt-2">
              <p className="text-gray-600 text-sm">Quantidade</p>
              {isCart ? (
                <>
                  {' '}
                  <div className="flex justify-between mt-1">
                    <CiCirclePlus
                      onClick={() =>
                        product.quantity < 10 &&
                        updateQuantity(product.id, product?.quantity + 1)
                      }
                      size={25}
                    />

                    <p className="text-red-600">{product.quantity}</p>

                    <CiCircleMinus
                      onClick={() =>
                        product.quantity > 1 &&
                        updateQuantity(product.id, product?.quantity - 1)
                      }
                      size={25}
                    />
                  </div>
                </>
              ) : (
                <p className="text-red-600 text-center">{product.quantity}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Items

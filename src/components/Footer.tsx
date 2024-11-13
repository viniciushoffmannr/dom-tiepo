import { MdOutlineShoppingCart } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { CartContext } from '../context/CartContext'

const Footer: React.FC = () => {
  const navigate = useNavigate()
  const { totalQuantity } = useContext(CartContext)!

  return (
    <footer className="fixed bottom-0 left-0 w-full bg-red-600 flex items-center py-1 flex-col">
      <div className="relative cursor-pointer">
        <MdOutlineShoppingCart
          onClick={() => navigate('/cart')}
          size={30}
          className="text-white"
        />

        {totalQuantity > 0 && (
          <div className="absolute top-0 right-0 bg-red-300 text-black rounded-full w-4 h-4 flex items-center justify-center text-sm font-semibold">
            {totalQuantity}
          </div>
        )}
      </div>
      <p className="text-black font-semibold">Carrinho</p>
    </footer>
  )
}

export default Footer

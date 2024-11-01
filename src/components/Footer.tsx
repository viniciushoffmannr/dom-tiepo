import { MdOutlineShoppingCart } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const Footer: React.FC = () => {
  const navigate = useNavigate()
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-red-600 flex items-center py-1 flex-col">
      <MdOutlineShoppingCart onClick={() => navigate('/cart')} size={30} />
      <p className="text-black font-semibold">Carrinho</p>
    </footer>
  )
}

export default Footer

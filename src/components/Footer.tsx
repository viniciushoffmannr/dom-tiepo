import { MdOutlineShoppingCart } from 'react-icons/md'

const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-red-600 flex items-center py-1 flex-col">
      <MdOutlineShoppingCart size={30} />
      <p className="text-black font-semibold">Carrinho</p>
    </footer>
  )
}

export default Footer

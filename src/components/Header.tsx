import logo from '../assets/logo.png'

const Header: React.FC = () => {
  return (
    <div className="w-full bg-black p-8 h-auto items-center justify-center flex">
      <img src={logo} alt="Logo da Pizzaria" className="w-36" />
    </div>
  )
}

export default Header

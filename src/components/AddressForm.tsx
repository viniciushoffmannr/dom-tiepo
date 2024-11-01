import React, { useState } from 'react'
import axios from 'axios'
import Header from './Header'
import { useNavigate } from 'react-router-dom'

interface AddressFormProps {}

export interface Address {
  zipCode: string
  street: string
  neighborhood: string
  city: string
  state: string
  number: string
}

const AddressForm: React.FC<AddressFormProps> = () => {
  const [address, setAddress] = useState<Address>({
    zipCode: '',
    street: '',
    neighborhood: '',
    city: '',
    state: '',
    number: '',
  })

  const navigate = useNavigate()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }))
  }

  const handleZipCodeBlur = async () => {
    if (address.zipCode.length === 8) {
      try {
        const response = await axios.get(
          `https://viacep.com.br/ws/${address.zipCode}/json/`
        )
        const data = response.data

        setAddress((prevAddress) => ({
          ...prevAddress,
          street: data.logradouro,
          neighborhood: data.bairro,
          city: data.localidade,
          state: data.uf,
        }))
      } catch (error) {
        console.error('Erro ao buscar o endereço:', error)
      }
    }
  }

  const submitForm = () => {
    localStorage.setItem('address', JSON.stringify(address))
    navigate('/checkout')
  }

  return (
    <div>
      <Header />
      <div className="p-6 max-w-md mx-auto">
        <h2 className="text-2xl font-semibold text-white text-center mb-4">
          Cadastro de Endereço
        </h2>
        <form onSubmit={submitForm} className="space-y-4">
          <input
            type="text"
            name="zipCode"
            value={address.zipCode}
            onChange={handleInputChange}
            onBlur={handleZipCodeBlur}
            placeholder="CEP"
            className="border border-red-500 p-2 w-full rounded-md focus:outline-none focus:border-red-700"
          />
          <input
            type="text"
            name="street"
            value={address.street}
            onChange={handleInputChange}
            placeholder="street"
            className="border border-red-500 p-2 w-full rounded-md focus:outline-none focus:border-red-700"
          />
          <input
            type="text"
            name="neighborhood"
            value={address.neighborhood}
            onChange={handleInputChange}
            placeholder="neighborhood"
            className="border border-red-500 p-2 w-full rounded-md focus:outline-none focus:border-red-700"
          />
          <input
            type="text"
            name="city"
            value={address.city}
            onChange={handleInputChange}
            placeholder="city"
            className="border border-red-500 p-2 w-full rounded-md focus:outline-none focus:border-red-700"
          />
          <input
            type="text"
            name="state"
            value={address.state}
            onChange={handleInputChange}
            placeholder="Estado"
            className="border border-red-500 p-2 w-full rounded-md focus:outline-none focus:border-red-700"
          />
          <input
            type="number"
            name="number"
            value={Number(address.number) > 0 ? address.number : ''}
            onChange={handleInputChange}
            placeholder="Numero"
            className="border border-red-500 p-2 w-full rounded-md focus:outline-none focus:border-red-700"
          />
          <div className="flex flex-col gap-3 items-center w-full mt-5">
            <button type="submit" className="bg-red-600 w-5/6 rounded p-2">
              <p className="font-bold text-white">Concluir</p>
            </button>

            <button
              onClick={() => navigate('/cart')}
              type="button"
              className="bg-gray-400 w-5/6 rounded p-2"
            >
              <p className="font-bold text-white">Cancelar</p>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddressForm

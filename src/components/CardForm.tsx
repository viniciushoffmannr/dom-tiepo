import React, { useState, ChangeEvent } from 'react'

const CreditCardForm: React.FC = () => {
  const [name, setName] = useState<string>('')
  const [cpf, setCpf] = useState<string>('')
  const [cardNumber, setCardNumber] = useState<string>('')
  const [expirationDate, setExpirationDate] = useState<string>('')
  const [cvv, setCvv] = useState<string>('')

  const maskCPF = (value: string): string =>
    value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2')

  const maskCardNumber = (value: string): string =>
    value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ')

  const maskExpirationDate = (value: string): string =>
    value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .substring(0, 5)

  const maskCVV = (value: string): string =>
    value.replace(/\D/g, '').substring(0, 3)

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>): void =>
    setName(e.target.value)
  const handleCpfChange = (e: ChangeEvent<HTMLInputElement>): void =>
    setCpf(maskCPF(e.target.value))
  const handleCardNumberChange = (e: ChangeEvent<HTMLInputElement>): void =>
    setCardNumber(maskCardNumber(e.target.value))
  const handleExpirationDateChange = (e: ChangeEvent<HTMLInputElement>): void =>
    setExpirationDate(maskExpirationDate(e.target.value))
  const handleCvvChange = (e: ChangeEvent<HTMLInputElement>): void =>
    setCvv(maskCVV(e.target.value))

  return (
    <div>
      <h2 className="font-semibold text-center text-red-500 mb-2">
        Cadastro de Cartão de Crédito
      </h2>
      <form className="space-y-4">
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleNameChange}
          placeholder="Nome"
          className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:border-blue-700"
        />
        <input
          type="text"
          name="cpf"
          value={cpf}
          onChange={handleCpfChange}
          placeholder="CPF"
          className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:border-blue-700"
        />
        <input
          type="text"
          name="cardNumber"
          value={cardNumber}
          onChange={handleCardNumberChange}
          placeholder="Número do Cartão"
          className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:border-blue-700"
        />
        <input
          type="text"
          name="expirationDate"
          value={expirationDate}
          onChange={handleExpirationDateChange}
          placeholder="Data de Expiração (MM/AA)"
          className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:border-blue-700"
        />
        <input
          type="text"
          name="cvv"
          value={cvv}
          onChange={handleCvvChange}
          placeholder="CVV"
          className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:border-blue-700"
        />
      </form>
    </div>
  )
}

export default CreditCardForm

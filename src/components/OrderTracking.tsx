import React, { useEffect, useState } from 'react'

interface Location {
  latitude: number
  longitude: number
}

const mockDeliveryRoute: Location[] = [
  { latitude: -23.5489, longitude: -46.6388 },
  { latitude: -23.5505, longitude: -46.6333 },
  { latitude: -23.5525, longitude: -46.6292 },
  { latitude: -23.5542, longitude: -46.6268 },
  { latitude: -23.5558, longitude: -46.6242 },
]

const OrderTracking: React.FC = () => {
  const [currentLocation, setCurrentLocation] = useState<Location>(
    mockDeliveryRoute[0]
  )
  const [status, setStatus] = useState<string>('Pedido em preparação')

  useEffect(() => {
    const statusUpdates = [
      'Pedido em preparação',
      'Pedido saiu para entrega',
      'Entregador a caminho',
      'Entregador próximo de você',
      'Pedido entregue',
    ]

    let locationIndex = 0
    let statusIndex = 0

    const intervalId = setInterval(() => {
      if (locationIndex < mockDeliveryRoute.length - 1) {
        locationIndex += 1
        setCurrentLocation(mockDeliveryRoute[locationIndex])
      }

      if (statusIndex < statusUpdates.length - 1) {
        statusIndex += 1
        setStatus(statusUpdates[statusIndex])
      } else {
        clearInterval(intervalId)
      }
    }, 3000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="p-4 text-center">
      <h2 className="text-2xl font-bold mb-4">Acompanhamento do Pedido</h2>
      <p className="text-lg font-semibold mb-2">{status}</p>
      <div className="border rounded p-4 mb-4">
        <h3 className="text-xl font-semibold mb-2">
          Localização do Entregador
        </h3>
        <p>Latitude: {currentLocation.latitude.toFixed(4)}</p>
        <p>Longitude: {currentLocation.longitude.toFixed(4)}</p>
      </div>
      <p className="text-sm text-gray-600">
        A posição do entregador é atualizada em tempo real. Aguarde o seu
        pedido!
      </p>
    </div>
  )
}

export default OrderTracking

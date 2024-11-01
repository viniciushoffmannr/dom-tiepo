import React, { useState, useEffect, useRef } from 'react'
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMap,
} from 'react-leaflet'
import L, { LatLngExpression } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import Header from './Header'

// Ícone personalizado para o motoboy
const motoboyIcon = new L.Icon({
  iconUrl: require('../assets/motoboy-icon.png'),
  iconSize: [32, 32],
})

// Componente para atualizar a vista do mapa
const MapView: React.FC<{ position: LatLngExpression }> = ({ position }) => {
  const map = useMap()

  useEffect(() => {
    map.setView(position)
  }, [position, map])

  return null
}

const DeliveryTracking: React.FC = () => {
  // Rota do motoboy (Caxias do Sul, RS)
  const route: LatLngExpression[] = [
    [-29.1687, -51.1797],
    [-29.1703, -51.1845],
    [-29.1725, -51.1871],
    [-29.1753, -51.1898],
    [-29.1772, -51.1923],
    [-29.1804, -51.194],
    [-29.1821, -51.1961],
    [-29.185, -51.1987],
    [-29.1869, -51.2012],
    [-29.1888, -51.2037],
  ]

  const [position, setPosition] = useState<LatLngExpression>(route[0])
  const [step, setStep] = useState<number>(0)
  const [hasArrived, setHasArrived] = useState<boolean>(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prevStep) => {
        const nextStep = prevStep + 1
        if (nextStep < route.length) {
          setPosition(route[nextStep])
          return nextStep
        } else {
          clearInterval(interval)
          setHasArrived(true) // Define que o motoboy chegou ao destino
          return prevStep
        }
      })
    }, 2000)
    return () => clearInterval(interval)
  }, [route])

  return (
    <div>
      <Header />
      <div className="flex  justify-center bg-black p-5">
        <div className="bg-white rounded-lg shadow-lg border-2 border-red-500 p-6 w-full max-w-md">
          <h2 className="text-2xl font-semibold text-red-500 mb-4 text-center">
            Acompanhamento de Pedido
          </h2>
          <MapContainer
            center={position}
            zoom={14}
            className="h-64 w-full rounded-lg mb-4"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; <a href='https://osm.org/copyright'>OpenStreetMap</a> contributors"
            />
            <Polyline positions={route} color="blue" />
            <Marker position={position} icon={motoboyIcon} />
            {/* Componente para atualizar a vista do mapa */}
            <MapView position={position} />
          </MapContainer>
          {hasArrived && (
            <div className="mt-5 px-6 py-3 bg-red-500 text-white rounded-md text-lg text-center">
              O pedido chegou!
            </div>
          )}
          <p className="text-center text-gray-700 mt-4">
            Acompanhe seu motoboy enquanto ele se dirige ao seu endereço.
            <br />
            Tempo estimado de entrega: <strong>15 minutos</strong>.
          </p>
        </div>
      </div>
    </div>
  )
}

export default DeliveryTracking

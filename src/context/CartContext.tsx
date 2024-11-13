import React, { createContext, useState, ReactNode } from 'react'

export interface Product {
  id: number
  name: string
  price: number
  description: string
  quantity: number
}

interface CartContextType {
  cartItems: Product[]
  addToCart: (product: Product) => void
  updateQuantity: (id: number, quantity: number) => void
  removeItem: (id: number) => void // Adicionando a função no tipo
  totalPrice: number
  totalQuantity: number
  hasDiscount: boolean
}

export const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<Product[]>([])

  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: product.quantity }
            : item
        )
      }
      return [...prev, { ...product, quantity: product.quantity }]
    })
  }

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity === 0) {
      removeItem(id)
      return
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    )
  }

  const hasDiscount =
    cartItems.some((item) => item.name === 'Doce') && cartItems.length > 1

  let totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  )

  totalPrice = hasDiscount ? totalPrice - 6 : totalPrice

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeItem,
        totalPrice,
        totalQuantity,
        hasDiscount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

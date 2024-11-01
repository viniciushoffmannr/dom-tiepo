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
  totalPrice: number
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

  const updateQuantity = (id: number, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    )
  }

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  )

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, updateQuantity, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  )
}

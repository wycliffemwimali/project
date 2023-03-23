import React from "react"
import { ProductFormContextType } from "./types"

const ProductFormContext = React.createContext<ProductFormContextType>({
    handleProductFormDialog: (openProductFormDialog: boolean) => null,
    isUsersLogedIn: false,
})

export { ProductFormContext }
import React from "react";
import { ProductFormContext } from "./context";
import { ProductFormPropType, ProductFormStateType } from "./types";

class ProductFormContextProvider extends React.Component<ProductFormPropType, ProductFormStateType>{
    constructor(props: ProductFormPropType) {
        super(props);
        this.state = {
            openProductFormDialog: false,
            isUsersLogedIn: false,
        }
    }

    handleProductFormDialog = (openProductFormDialog: boolean) => {

        this.setState(rest => ({ ...rest, openProductFormDialog }))
    }

    render(): React.ReactNode {
        return (
            <ProductFormContext.Provider
                value={{ }}
            >
                {this.props.children}
             </ProductFormContext.Provider>
        )
    }
}

const ProductFormContextConsumer = ProductFormContext.Consumer;
export { ProductFormContextProvider, ProductFormContextConsumer }
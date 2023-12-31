import { IProduct } from "./product"


export interface InputCart {
    productId: string
    name: string
    price: number
    image: string
    quantity: number
}
export interface ICart {
    message: string
    data: {
        products: IProduct[]
        total: number
        userId: string
    }
}
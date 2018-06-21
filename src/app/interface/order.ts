import { ShoppingCart } from "./shopping-cart";

export class Order {
    datePlaced: number
    items: any 
    constructor(
        public userId: string,
        public shipping: any,
        public shoppingCart: ShoppingCart
    ) {
        this.datePlaced = new Date().getTime()

        this.items = {}
        for (let key in shoppingCart.items) {

            let item = shoppingCart.items[key]
            let keysItem = Object.keys(shoppingCart.items)
            let price = parseFloat(item.product.price)

            for (let i = 0; i < keysItem.length; i++) {

                if (key === keysItem[i]) {
                    this.items[i] = {
                        product: {
                            title: item.product.title,
                            imageUrl: item.product.imageUrl,
                            price: item.product.price
                        },
                        quantity: item.quantity,
                        totalPrice: item.quantity * price
                    }
                }
            }
        }


    }
}
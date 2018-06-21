import { ShoppingCartItem } from "./shopping-cart-item";

export class ShoppingCart {
    // itemsTotalPrice: any
    constructor(public items: ShoppingCartItem[]) {
        // for (let key in items) {
        //     let price = items[key].product.price
        //     let quantity= items[key].quantity
        //     this.itemsTotalPrice = this.getTotalPrice(price, quantity)
        // }
    }

    getTotalItemsCount(): number {
        let count = 0
        for (let item in this.items) {
            count += this.items[item].quantity
        }
        return count
    }

    getTotalPrice(productPrice, quantity) {
        return productPrice * quantity
    }
 
} 
export type PricingRules = {
  [item: string]: {
    unitPrice: number;
    specialPrice?: {
      quantity: number;
      price: number;
    };
  };
};

export type CartItem = {
  item: string;
  quantity: number;
};

export class Checkout {
  private pricingRules: PricingRules;

  constructor(pricingRules: PricingRules) {
    this.pricingRules = pricingRules;
  }

  scan(item: string, cart: CartItem[]): CartItem[] {
    if (!this.pricingRules[item]) {
      throw new Error(`Invalid item: ${item}`);
    }

    const itemInCart = cart.find((cartItem) => cartItem.item === item);

    if (itemInCart) {
      itemInCart.quantity += 1;
    } else {
      cart.push({ item, quantity: 1 });
    }

    return cart;
  }
  getPrice(item: string, quantity: number): number {
    const { unitPrice, specialPrice } = this.pricingRules[item];

    if (specialPrice) {
      const specialPriceQuantity = Math.floor(quantity / specialPrice.quantity);
      const specialPriceTotal =
        specialPriceQuantity * specialPrice.price +
        (quantity % specialPrice.quantity) * unitPrice;
      return specialPriceTotal;
    } else {
      return quantity * unitPrice;
    }
  }
  getTotal(cart: CartItem[]): number {
    let total = 0;

    for (const cartItem of cart) {
      const { item, quantity } = cartItem;
      const { unitPrice, specialPrice } = this.pricingRules[item];

      if (specialPrice) {
        const specialPriceQuantity = Math.floor(
          quantity / specialPrice.quantity
        );
        const specialPriceTotal =
          specialPriceQuantity * specialPrice.price +
          (quantity % specialPrice.quantity) * unitPrice;
        total += specialPriceTotal;
      } else {
        total += quantity * unitPrice;
      }
    }

    return total;
  }
//   removeItem(item: string, cart: CartItem[]): CartItem[] {
//   const itemIndex = cart.findIndex((cartItem) => cartItem.item === item);

//   if (itemIndex !== -1) {
//     const itemQuantity = cart[itemIndex].quantity;
//     cart.splice(itemIndex, 1);


//     if (itemQuantity > 1) {
//       cart.push({ item, quantity: itemQuantity - 1 });
//     }
//   }

//   return cart;
// }
}



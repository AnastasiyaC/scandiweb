import { InMemoryCache, makeVar } from '@apollo/client';

export const cartItemsVar = makeVar(JSON.parse(localStorage.getItem('cartItems')) || []);
export const currencyVar = makeVar(localStorage.getItem('currency') || '$');
export const totalPriceVar = makeVar([]);
export const selectedAttributesVar = makeVar([]);

export const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                cartItems: {
                    read() {
                        return cartItemsVar();
                    }
                }
            }
        }
    }
});
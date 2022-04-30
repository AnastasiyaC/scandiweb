import { InMemoryCache, makeVar } from '@apollo/client';

export const cartItemsVar = makeVar(JSON.parse(localStorage.getItem('cartItems')) || []);
export const currencyVar = makeVar(localStorage.getItem('currency') || '$');
export const totalItemsCount = makeVar(Number(localStorage.getItem('totalItemsCount')) || 0);
export const totalPrice = makeVar([]);
export const selectedAttributesVar = makeVar([]);

export const cache = new InMemoryCache();
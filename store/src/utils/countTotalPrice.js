export default function countTotalPrice(totalPrice, currentPrice, count = 1) {
    if( !totalPrice.length ) return currentPrice;

    return totalPrice.map((el, i) => {
        const amount = el.amount + currentPrice[i].amount * count;
        return {
            ...el,
            amount
        }
    })
};
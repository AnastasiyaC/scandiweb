export default function countTotalItemsCount(arr) {
    return arr.reduce( (sum, current) => sum + current.count, 0);
};
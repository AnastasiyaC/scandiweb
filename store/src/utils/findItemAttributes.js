export default function findItemAttributes(arr) {
    const attributes = [];

    if (!arr) return;

    arr.forEach((el) => {
        attributes.push({
            [el.name]: el.items.map(el => el.value)
        });
    });

    return attributes;
}
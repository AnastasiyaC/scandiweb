export default function findObjectInArray(strId, arr) {
    return arr.find(el => el.id === strId)
};

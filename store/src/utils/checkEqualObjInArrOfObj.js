export default function checkEqualObjInArrOfObj(obj, arr) {
    return arr.find( el => {
        if( el.id === obj.id && !obj.attributes ) {
            return el;
        }
        if( el.id === obj.id ) {
            const equalObj = Object.keys(obj.attributes).every(key => el.attributes[key] === obj.attributes[key]);

            return equalObj ? el : false;
        }
    });
};
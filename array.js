const UArray = {
    /**
     * Nos indica si un índice este dentro del rando de la longitud del array.
     * @param {*} array 
     * @param {*} i 
     * @returns 
     */
    inRange(array, i) {
        return i >= 0 && i < array.length;
    },
    /**
     * Recupera el elemento delíndice indicado o "null" si es un índice fuera de rango.
     * @param {*} array 
     * @param {*} i 
     * @returns 
     */
    get(array, i) {
        return this.inRange(array, i) ? array[i] : null;
    },
    /**
     * Groups array of objects by object property value.
     * @param {*} array 
     * @param {*} property 
     * @param {*} accum 
     * @returns Object with array elements grouped
     */
    groupBy(array, property, accum = true) {
        if (!Array.isArray(array)) throw new Error("First argument must be an array!");

        const groups = {};
        for (const item of array) {
            // if (!this.isObject(item)) throw new Error("Found an item inside the array that it's not an object");

            if (!accum) {
                groups[item[property]] = item;
            } else {
                if (!groups[item[property]]) {
                    groups[item[property]] = [];
                }
                groups[item[property]].push(item);
            }
        }
        return groups;
    },
    /**
     * Pushes an item inside an array if it's not already in.
     * If the item it's another array, then it pushes all it's items.
     * @param {*} array Array to push the new item
     * @param {*} item A value or an Array
     * @param {*} push_empty If set to true it will push empty values
     */
    pushIfNotIn(array, item, push_empty = false) {
        if (!array || !Array.isArray(array)) 
            throw Error("First argument must be an array!");
        
        if (!push_empty && (!item || item === '')) 
            return;

        if (Array.isArray(item)) {
            for (const _item of item)
                this.arrayPushIfNotIn(array, _item);
        } else {
            if (!array.includes(item))
                array.push(item);
        }
    },
    /**
     * Returns a new array without duplicated elements.
     * @param {*} array 
     * @returns 
     */
    uniq(array) {
        return Array.from(new Set(array));
    },
}

module.exports = UArray
const UString = {
    /**
     * Checks if a string it's a number
     * @param {*} str 
     * @returns true if the given string it's a number
     */
    isNumeric(str) {
        return typeof +str == 'number' && !isNaN(+str)
    },
    /**
     * Removes all the accents from a string
     * @param string
     * @returns The same string without accents
     */
    removeAccents(string) {
        const accents = { 'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u', 'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U' };
        return string.split('').map(letter => accents[letter] || letter).join('').toString();
    },
    /**
     * Removes emojis from text.
     * @param {*} string 
     * @returns 
     */
    removeEmojis(string, replace_value = '') {
        const target_value = /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g;
        return this.replaceAll(string, target_value, replace_value);
    },
    /**
     * Replaces all ocurrences of a given string.
     * @param {*} string 
     * @param {*} target_value 
     * @param {*} replace_value 
     */
    replaceAll(string, target_value, replace_value) {
        if (!typeof string === 'string'
            || !typeof target_value === 'string'
            || !typeof replace_value === 'string'
        ) {
            throw new Error("Must provide 3 string values to this function!");
        }
        return string.split(target_value).join(replace_value);
    },
    /**
     * Convert String CamelCased to snake_case
     * @param {*} str 
     * @returns 
     */
    camelToSnakeCase: str => {
        str = str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
        if (str.startsWith('_')) str = str.substring(1)
        return str
    },
}

module.expots = UString
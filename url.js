const UUrl = {
    /**
     * Checks if a string is a valid URL
     * @param {*} string 
     * @returns 
     */
    isValidHttpUrl(string) {
        let url;
        try {
            url = new URL(string);
        } catch (e) {
            return false;
        }
        return url.protocol === "http:" || url.protocol === "https:";
    },
}

module.exports = UUrl
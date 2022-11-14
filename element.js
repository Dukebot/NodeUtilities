/**
 * Class to build Html string creating a tree structure of elements.
 * We need a root element and then add childs to that root creating the different html tags.
 */
 class Element {
    /**
     * Instanciates a new element.
     * @param {*} tag 
     * @param {*} data 
     */
    constructor(tag, data) {
        this.tag = tag;
        this.text = '';
        this.properties = {};
        this.childs = [];

        if (data) {
            this.text = data.text || this.text;
            this.properties = data.properties || this.properties;
            
            if (data.child) data.childs = [data.child];
            if (!data.childs) data.childs = [];
            
            for (const element of data.childs) {
                this.addChild(element);
            }
        }
    }
    /**
     * CREATE AND ADD CHILD
     * @param {*} tag 
     * @param {*} data 
     */
    CAAC(tag, data) {
        this.addChild(new Element(tag, data));
    }
    /**
     * Adds an array of elements or a signle element to the childs array.
     * @param {*} element 
     */
    addChild(element) {
        if (Array.isArray(element)) {
            for (const _element of element) {
                this.addChild(_element);
            }
        } else {
            if (element instanceof Element) {
                this.childs.push(element);
            } else {
                throw new Error('Can only add an Element, provided: ' + element);
            }
        }
    }
    /**
     * Instanciates a new element and adds it to the array of childs.
     * @param {*} tag 
     * @param {*} data 
     */
    createAddChild(tag, data) {
        const element = new Element(tag, data);
        this.addChild(element);
    }
    /**
     * Converts the current element and it's childs to string.
     */
    toHtml() {
        let str = `<${this.tag}${this.getPropertiesString()}>${this.text}`;
        for (const element of this.childs) {
            str += `${element.toHtml()}`;
        }
        str += `</${this.tag}>`;
        return str;
    }
    /**
     * Reads the property object and return a string with those properties in html format.
     */
    getPropertiesString() {
        let str = '';
        for (const property in this.properties) {
            str += `${property}="${this.properties[property]}"`;
        }
        if (str != '') str = ' ' + str;
        return str;
    }
}

module.exports = Element;
const fs = require('fs')

class Json {
    constructor(directory, name) {
        if (!directory.endsWith('/')) directory += '/'
        if (!name.endsWith('.json')) name += '.json'

        this.directory = directory
        this.name = name
    }
    get path() {
        return this.directory + this.name
    }
    create(data) {
        fs.writeFileSync(this.path, JSON.stringify(data, null, 2))
    }
    get() {
        return JSON.parse(fs.readFileSync(this.path))
    }
    exists() {
        return fs.existsSync(this.path)
    }
}

module.exports = Json
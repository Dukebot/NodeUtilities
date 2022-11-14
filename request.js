const axios = require('axios').default

const onSuccess = res => {
    console.log('onSuccess')
    return res.data
}
const onError = err => {
    console.log('onError')
    console.log(err.response.data)
}

class Request {
    constructor(urlApi, debug) {
        this.urlApi = urlApi
        this.debug = debug
    }

    async get(endPoint) {
        if (this.debug) console.log(this.urlApi + endPoint)

        return axios.get(this.urlApi + endPoint)
            .then(onSuccess).catch(onError)
    }

    async put(endPoint, data) {
        if (this.debug) console.log(this.urlApi + endPoint, data)

        return axios.put(this.urlApi + endPoint, data)
            .then(onSuccess).catch(onError)
    }

    async post(endPoint, data) {
        if (this.debug) console.log(this.urlApi + endPoint, data)

        return axios.post(this.urlApi + endPoint, data)
            .then(onSuccess).catch(onError)
    }
    
    async delete(endPoint) {
        if (this.debug) console.log(this.urlApi + endPoint)

        return axios.delete(this.urlApi + endPoint)
            .then(onSuccess).catch(onError)
    }
}

module.exports = Request
const moment = require('moment')

class Moment {
    constructor(
        dateFormat = 'YYYY-MM-DD', 
        timeFormat = 'HH:mm:ss', 
        dateTimeFormat = 'YYYY-MM-DD HH:mm:ss'
    ) {
        this._dateFormat = dateFormat
        this._timeFormat = timeFormat
        this._dateTimeFormat = dateTimeFormat
    }

    get dateFormat() {
        return this._dateFormat
    }
    get timeFormat() {
        return this._timeFormat
    }
    get dateTimeFormat() {
        return this._dateTimeFormat
    }

    new(date) {
        return moment(date)
    }

    format(date, format) {
        return moment(date).format(format)
    }
    formatDate(date) {
        return this.format(date, this.dateFormat)
    }
    formatTime(time) {
        return this.format(time, this.timeFormat)
    }
    formatDateTime(dateTime) {
        return this.format(dateTime, this.dateTimeFormat)
    }
}

module.exports = Moment
const MySQL            = require('mysql');
const SQL_QueryBuilder = require('../Helper/SQL_QueryBuilder');
const Environment      = require('../Core/Environment');


const DatabaseSettings = {
    host    : '192.168.1.175',
    user    : 'developers',
    password: 'm0squ1t069'
};


class MySQL_Connection {

    constructor() {
        this.connection = null;
        this.connect();
    }

    connect() {
        if (this.connection) throw new Error("Already connected to the database");

        DatabaseSettings.database = Environment.getDatabaseName();
        this.connection           = MySQL.createConnection(DatabaseSettings);

        console.log("Connected to:");
        console.log(DatabaseSettings);
    }

    disconnect() {
        if (this.connection) {
            this.connection.end();
            this.connection = null;

            console.log("Connection closed:");
            console.log(DatabaseSettings);
        } else {
            throw new Error("Connection was already closed");
        }
    }

    isConnected() {
        if (this.connection) return true;
        return false;
    }


    query(sentence) {
        if (!this.connection) throw new Error("Can't query without opening a new connection");

        return new Promise((resolve) => {
            this.connection.query(sentence, (error, response) => {
                if (error) throw error;
                return resolve(response);
            });
        });
    }

    static query(sentence) {
        const mySqlCon = new MySQL_Connection();

        return mySqlCon.query(sentence)
            .then(response => {
                mySqlCon.disconnect();
                return response;
            }).catch(error => {
                mySqlCon.disconnect();
                return error;
            });
    }


    get(table, columns, where) {
        return this.query(SQL_QueryBuilder.select(table, columns, where));
    }

    static get(table, columns, where) {
        const mySqlCon = new MySQL_Connection();

        return mySqlCon.get(table, columns, where)
            .then(response => {
                mySqlCon.disconnect();
                return response;
            }).catch(error => {
                mySqlCon.disconnect();
                return error;
            });
    }


    create(table, object) {
        return this.query(SQL_QueryBuilder.insert(table, object));
    }

    static create(table, object) {
        const mySqlCon = new MySQL_Connection();

        return mySqlCon.create(table, object)
            .then(response => {
                mySqlCon.disconnect();
                return response;
            }).catch(error => {
                mySqlCon.disconnect();
                return error;
            });
    }


    update(table, values, where) {
        return this.query(SQL_QueryBuilder.update(table, values, where));
    }

    static update(table, values, where) {
        const mySqlCon = new MySQL_Connection();

        return mySqlCon.update(table, values, where)
            .then(response => {
                mySqlCon.disconnect();
                return response;
            }).catch(error => {
                mySqlCon.disconnect();
                return error;
            });
    }


    delete(table, where) {
        return this.query(SQL_QueryBuilder.delete(table, where));
    }

    static delete(table, where) {
        const mySqlCon = new MySQL_Connection();

        return mySqlCon.delete(table, where)
            .then(response => {
                mySqlCon.disconnect();
                return response;
            }).catch(error => {
                mySqlCon.disconnect();
                return error;
            });
    }
}

module.exports = MySQL_Connection;

class SQL_QueryBuilder {

    static select(table, columns = ["*"], where = false) {

        let colsToGet = "";
        for (const col of columns) {
            if (colsToGet !== "") colsToGet += ", ";
            colsToGet += col;
        }

        let query = "SELECT " + colsToGet + " FROM " + table;
        if (where) query += " WHERE " + getWhereCondition(where);

        return query;
    }


    static insert(table, object) {

        let colsToInsert = "";
        let valuesToInsert = "";
        for (const key in object) {
            if (colsToInsert !== "") colsToInsert += ", ";
            if (valuesToInsert !== "") valuesToInsert += ", ";

            colsToInsert += key;
            valuesToInsert += "'" + object[key] + "'";
        }

        return 'INSERT INTO ' + table + ' (' + colsToInsert + ') VALUES (' + valuesToInsert + ')';
    }


    static update(table, values, where) {

        let valuesToUpdate = "";
        for (const colName in values) {
            if (valuesToUpdate !== "") valuesToUpdate += ", ";
            valuesToUpdate += "`" + colName + "` = '" + values[colName] + "'";
        }

        return "UPDATE " + table + " SET " + valuesToUpdate + " WHERE (" + getWhereCondition(where) + ")";
    }


    static delete(table, where) {
        return "DELETE FROM " + table + " WHERE (" + getWhereCondition(where) + ")";
    }
}


function getWhereCondition(where) {
    let whereCondition = "";

    if (typeof where === "string") {
        whereCondition = where;
    }
    else if (typeof where === "object") {
        for (const key in where) {
            const value = where[key];

            if (whereCondition !== "") whereCondition += " AND ";
            whereCondition += "`" + key + "` = '" + value + "'";
        }
    }

    return whereCondition;
}


module.exports = SQL_QueryBuilder;

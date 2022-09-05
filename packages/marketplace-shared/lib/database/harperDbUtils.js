require("dotenv").config();
const request = require("request-promise");

var _url;
var _auth_key;
const DB_SCHEMA_NAME = "dbMarketplace";
const TABLE_DEPLOYED_ADDRESSES_ABIS_NAME = "contracts";

function setDbConfig(endpoint_url, auth_key) {
    _url = endpoint_url;
    _auth_key = auth_key;
}

function getDbConfig(_method) {
    return (options = {
        method: _method,
        url: _url,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${_auth_key}`,
        },
    });
}

function postData(data) {
    const config = getDbConfig("post");
    config.body = data;
    return config;
}

async function describeSchema(schemaName) {
    if (!schemaName) throw new Error("parameter schemaName must not be null");
    var data = JSON.stringify({
        operation: "describe_schema",
        schema: schemaName,
    });
    const config = postData(data);
    return await execute(config);
}

async function dropSchema(schemaName) {
    if (!schemaName) throw new Error("parameter schemaName must not be null");
    var data = JSON.stringify({
        operation: "drop_schema",
        schema: schemaName,
    });
    const config = postData(data);
    return await execute(config);
}

async function createSchema(schemaName) {
    if (!schemaName) throw new Error("parameter schemaName must not be null");
    var data = JSON.stringify({
        operation: "create_schema",
        schema: schemaName,
    });
    const config = postData(data);
    return await execute(config);
}

async function createTable(schemaName, tableName, primaryKeyName) {
    var data = JSON.stringify({
        operation: "create_table",
        schema: schemaName,
        table: tableName,
        hash_attribute: primaryKeyName,
    });
    const config = postData(data);
    return await execute(config);
}

async function insertIntoTable(schemaName, tableName, jsonContent) {
    if (!schemaName || !tableName || !jsonContent) throw new Error("parameters must not be null");

    var data = JSON.stringify({
        operation: "insert",
        schema: "dbMarketplace",
        table: "contracts",
        records: jsonContent,
    });

    const config = postData(data);
    return await execute(config);
}

async function execute(options) {
    try {
        await request(options);
        return true;
    } catch (error) {
        console.log(error);
    }
}

async function execSQL(_sql) {
    if (!_sql) throw new Error("parameter sql must not be null");
    var data = JSON.stringify({
        operation: "sql",
        sql: _sql,
    });
    const config = postData(data);
    try {
        return await request(config);
    } catch (error) {
        console.log(error);
        return { error: error };
    }
}

module.exports = {
    DB_SCHEMA_NAME,
    TABLE_DEPLOYED_ADDRESSES_ABIS_NAME,
    createSchema,
    createTable,
    describeSchema,
    dropSchema,
    execSQL,
    insertIntoTable,
    setDbConfig,
};

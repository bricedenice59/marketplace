require("dotenv").config();
const request = require("request-promise");

function getDbConfig(_method) {
    return (options = {
        method: _method,
        url: process.env.HARPERDB_CLOUD_ENPOINT,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${process.env.HARPERDB_AUTH_KEY}`,
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
    try {
        await request(config);
        return true;
    } catch (error) {
        //schema does not exist
        return false;
    }
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
        throw error;
    }
}

module.exports = {
    createSchema,
    createTable,
    describeSchema,
    dropSchema,
    insertIntoTable,
};

function addresses() {
    try {
        return require.resolve("./addresses.json");
    } catch (e) {
        return {};
    }
}

function abis() {
    try {
        return require.resolve("./abis.json");
    } catch (e) {
        return {};
    }
}

const CONTRACTS_ADDRESSES_FILE = "addresses.json";
const CONTRACTS_ABIS_FILE = "abis.json";
const ROOT_CONTRACTS_JSON = "contracts";
const ROOT_ABIS_JSON = "abis";

module.exports = {
    addresses,
    abis,
    PROJECT_DIR: __dirname,
    CONTRACTS_ADDRESSES_FILE,
    CONTRACTS_ABIS_FILE,
    ROOT_ABIS_JSON,
    ROOT_CONTRACTS_JSON,
};

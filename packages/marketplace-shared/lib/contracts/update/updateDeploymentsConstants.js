const fs = require("fs");
var path = require("path");
const {
    PROJECT_DIR,
    CONTRACTS_ABIS_FILE,
    CONTRACTS_ADDRESSES_FILE,
    ROOT_ABIS_JSON,
    ROOT_CONTRACTS_JSON,
} = require("../constants/index");

var empty = {};

const updateContractAddresses = (_contractname, _contractAddress, _chainId) => {
    const addressesFilePath = path.join(PROJECT_DIR, CONTRACTS_ADDRESSES_FILE);
    const root = ROOT_CONTRACTS_JSON;
    const contractname = _contractname;
    const contractAddress = _contractAddress;
    const chainId = _chainId;

    if (!fs.existsSync(addressesFilePath)) {
        fs.writeFileSync(addressesFilePath, JSON.stringify(empty), function (err) {
            if (err) throw err;
        });
    }

    const fsRead = fs.readFileSync(addressesFilePath, "utf-8");
    const currentAddresses = JSON.parse(fsRead);
    if (root in currentAddresses) {
        const node = currentAddresses[root].find(
            (x) => x.contractname == _contractname && x.chainId === chainId
        );
        if (!node) {
            currentAddresses[root].push({ contractname, chainId, contractAddress });
        } else {
            if (node.contractAddress != contractAddress) node.contractAddress = contractAddress;
            else return;
        }
    } else {
        currentAddresses[root] = [];
        currentAddresses[root].push({ contractname, chainId, contractAddress });
    }
    fs.writeFileSync(addressesFilePath, JSON.stringify(currentAddresses));
};

const updateContractAbis = (_contractname, _abi, _chainId) => {
    const abiFilePath = path.join(PROJECT_DIR, CONTRACTS_ABIS_FILE);
    const root = "abis";
    const contractname = _contractname;
    const contractAbi = _abi;
    const chainId = _chainId;

    if (!fs.existsSync(abiFilePath)) {
        fs.writeFileSync(abiFilePath, JSON.stringify(empty), function (err) {
            if (err) throw err;
        });
    }

    const fsRead = fs.readFileSync(abiFilePath, "utf-8");
    const currentAbis = JSON.parse(fsRead);
    if (root in currentAbis) {
        const node = currentAbis[root].find(
            (x) => x.contractname == _contractname && x.chainId === chainId
        );
        if (!node) {
            currentAbis[root].push({ contractname, chainId, contractAbi });
        } else {
            if (node.contractAbi != contractAbi) node.contractAbi = contractAbi;
            else return;
        }
    } else {
        currentAbis[root] = [];
        currentAbis[root].push({ contractname, chainId, contractAbi });
    }

    fs.writeFileSync(abiFilePath, JSON.stringify(currentAbis));
};

module.exports = {
    updateContractAddresses,
    updateContractAbis,
};

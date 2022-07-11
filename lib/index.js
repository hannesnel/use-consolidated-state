"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
function useConsolidatedState(initialState) {
    const [consolidatedState, setConsolidatedState] = (0, react_1.useState)(initialState);
    function functionCase(key) {
        return "set" + key[0].toUpperCase() + key.slice(1);
    }
    const setters = Object.keys(consolidatedState).reduce((acc, key) => {
        return Object.assign(Object.assign({}, acc), { [functionCase(key)]: (value) => setConsolidatedState((prev) => (Object.assign(Object.assign({}, prev), { [key]: value }))) });
    }, {});
    const setState = (state) => setConsolidatedState((prev) => (Object.assign(Object.assign({}, prev), state)));
    return Object.assign(Object.assign(Object.assign({}, consolidatedState), setters), { setState });
}
exports.default = useConsolidatedState;

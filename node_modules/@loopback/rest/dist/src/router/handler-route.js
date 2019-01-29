"use strict";
// Copyright IBM Corp. 2017, 2018. All Rights Reserved.
// Node module: @loopback/rest
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
const base_route_1 = require("./base-route");
class Route extends base_route_1.BaseRoute {
    constructor(verb, path, spec, _handler) {
        super(verb, path, spec);
        this.spec = spec;
        this._handler = _handler;
    }
    describe() {
        return this._handler.name || super.describe();
    }
    updateBindings(requestContext) {
        // no-op
    }
    async invokeHandler(requestContext, args) {
        return await this._handler(...args);
    }
}
exports.Route = Route;
//# sourceMappingURL=handler-route.js.map
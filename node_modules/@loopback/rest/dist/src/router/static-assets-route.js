"use strict";
// Copyright IBM Corp. 2017, 2018. All Rights Reserved.
// Node module: @loopback/rest
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const HttpErrors = require("http-errors");
class StaticAssetsRoute {
    constructor(_expressRouter = express_1.Router()) {
        this._expressRouter = _expressRouter;
        // ResolvedRoute API
        this.pathParams = [];
        this.schemas = {};
        // RouteEntry implementation
        this.verb = 'get';
        this.path = '/*';
        this.spec = {
            description: 'LoopBack static assets route',
            'x-visibility': 'undocumented',
            responses: {},
        };
    }
    registerAssets(path, rootDir, options) {
        this._expressRouter.use(path, express_1.static(rootDir, options));
    }
    updateBindings(requestContext) {
        // no-op
    }
    async invokeHandler({ request, response }, args) {
        const handled = await executeRequestHandler(this._expressRouter, request, response);
        if (!handled) {
            // Express router called next, which means no route was matched
            throw new HttpErrors.NotFound(`Endpoint "${request.method} ${request.path}" not found.`);
        }
    }
    describe() {
        return 'final route to handle static assets';
    }
}
exports.StaticAssetsRoute = StaticAssetsRoute;
/**
 * Execute an Express-style callback-based request handler.
 *
 * @param handler
 * @param request
 * @param response
 * @returns A promise resolved to:
 * - `true` when the request was handled
 * - `false` when the handler called `next()` to proceed to the next
 *    handler (middleware) in the chain.
 */
function executeRequestHandler(handler, request, response) {
    return new Promise((resolve, reject) => {
        const onceFinished = () => resolve(true);
        response.once('finish', onceFinished);
        handler(request, response, (err) => {
            response.removeListener('finish', onceFinished);
            if (err) {
                reject(err);
            }
            else {
                // Express router called next, which means no route was matched
                resolve(false);
            }
        });
    });
}
//# sourceMappingURL=static-assets-route.js.map
/// <reference types="express" />
import { ControllerSpec } from '@loopback/openapi-v3';
import { PathObject } from '@loopback/openapi-v3-types';
import { Request } from '../types';
import { ControllerClass, ControllerFactory } from './controller-route';
import { RestRouter } from './rest-router';
import { ResolvedRoute, RouteEntry } from './route-entry';
import { StaticAssetsRoute } from './static-assets-route';
/**
 * Routing table
 */
export declare class RoutingTable {
    private readonly _router;
    /**
     * A route for static assets
     */
    private _staticAssetsRoute;
    constructor(_router?: RestRouter, staticAssetsRoute?: StaticAssetsRoute);
    /**
     * Register a controller as the route
     * @param spec
     * @param controllerCtor
     * @param controllerFactory
     */
    registerController<T>(spec: ControllerSpec, controllerCtor: ControllerClass<T>, controllerFactory?: ControllerFactory<T>): void;
    static joinPath(basePath: string, path: string): string;
    /**
     * Register a route
     * @param route A route entry
     */
    registerRoute(route: RouteEntry): void;
    describeApiPaths(): PathObject;
    /**
     * Map a request to a route
     * @param request
     */
    find(request: Request): ResolvedRoute;
}

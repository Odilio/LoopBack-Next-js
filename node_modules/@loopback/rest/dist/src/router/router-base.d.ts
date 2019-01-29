/// <reference types="express" />
import { Request } from '../types';
import { ResolvedRoute, RouteEntry } from './route-entry';
import { RestRouter } from './rest-router';
/**
 * Base router implementation that only handles path without variables
 */
export declare abstract class BaseRouter implements RestRouter {
    /**
     * A map to optimize matching for routes without variables in the path
     */
    protected routesWithoutPathVars: {
        [path: string]: RouteEntry;
    };
    protected getKeyForRoute(route: RouteEntry): string;
    add(route: RouteEntry): void;
    protected getKeyForRequest(request: Request): string;
    find(request: Request): ResolvedRoute | undefined;
    list(): RouteEntry[];
    /**
     * Add a route with path variables
     * @param route
     */
    protected abstract addRouteWithPathVars(route: RouteEntry): void;
    /**
     * Find a route with path variables
     * @param route
     */
    protected abstract findRouteWithPathVars(request: Request): ResolvedRoute | undefined;
    /**
     * List routes with path variables
     */
    protected abstract listRoutesWithPathVars(): RouteEntry[];
}

import { Context } from '@loopback/context';
import { OperationObject, SchemasObject } from '@loopback/openapi-v3-types';
import { Router } from 'express';
import { PathParams } from 'express-serve-static-core';
import { ServeStaticOptions } from 'serve-static';
import { RequestContext } from '../request-context';
import { OperationArgs, OperationRetval, PathParameterValues } from '../types';
import { ResolvedRoute, RouteEntry } from './route-entry';
export declare class StaticAssetsRoute implements RouteEntry, ResolvedRoute {
    private readonly _expressRouter;
    readonly pathParams: PathParameterValues;
    readonly schemas: SchemasObject;
    readonly verb: string;
    readonly path: string;
    readonly spec: OperationObject;
    constructor(_expressRouter?: Router);
    registerAssets(path: PathParams, rootDir: string, options?: ServeStaticOptions): void;
    updateBindings(requestContext: Context): void;
    invokeHandler({ request, response }: RequestContext, args: OperationArgs): Promise<OperationRetval>;
    describe(): string;
}

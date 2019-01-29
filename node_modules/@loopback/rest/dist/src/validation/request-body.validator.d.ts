import { RequestBodyObject, SchemasObject } from '@loopback/openapi-v3-types';
import * as AJV from 'ajv';
import { RequestBody } from '..';
export declare type RequestBodyValidationOptions = AJV.Options;
/**
 * Check whether the request body is valid according to the provided OpenAPI schema.
 * The JSON schema is generated from the OpenAPI schema which is typically defined
 * by `@requestBody()`.
 * The validation leverages AJS schema validator.
 * @param body The request body parsed from an HTTP request.
 * @param requestBodySpec The OpenAPI requestBody specification defined in `@requestBody()`.
 * @param globalSchemas The referenced schemas generated from `OpenAPISpec.components.schemas`.
 */
export declare function validateRequestBody(body: RequestBody, requestBodySpec?: RequestBodyObject, globalSchemas?: SchemasObject, options?: RequestBodyValidationOptions): void;

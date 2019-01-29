"use strict";
// Copyright IBM Corp. 2017,2018. All Rights Reserved.
// Node module: @loopback/example-todo
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
const debugFactory = require("debug");
const lodash_1 = require("lodash");
const errors_1 = require("../../errors");
const type_resolver_1 = require("../../type-resolver");
const has_many_repository_1 = require("./has-many.repository");
const debug = debugFactory('loopback:repository:has-many-repository-factory');
/**
 * Enforces a constraint on a repository based on a relationship contract
 * between models. For example, if a Customer model is related to an Order model
 * via a HasMany relation, then, the relational repository returned by the
 * factory function would be constrained by a Customer model instance's id(s).
 *
 * @param relationMetadata The relation metadata used to describe the
 * relationship and determine how to apply the constraint.
 * @param targetRepositoryGetter The repository which represents the target model of a
 * relation attached to a datasource.
 * @returns The factory function which accepts a foreign key value to constrain
 * the given target repository
 */
function createHasManyRepositoryFactory(relationMetadata, targetRepositoryGetter) {
    const meta = resolveHasManyMetadata(relationMetadata);
    debug('Resolved HasMany relation metadata: %o', meta);
    return function (fkValue) {
        // tslint:disable-next-line:no-any
        const constraint = { [meta.keyTo]: fkValue };
        return new has_many_repository_1.DefaultHasManyRepository(targetRepositoryGetter, constraint);
    };
}
exports.createHasManyRepositoryFactory = createHasManyRepositoryFactory;
/**
 * Resolves given hasMany metadata if target is specified to be a resolver.
 * Mainly used to infer what the `keyTo` property should be from the target's
 * belongsTo metadata
 * @param relationMeta hasMany metadata to resolve
 */
function resolveHasManyMetadata(relationMeta) {
    if (!type_resolver_1.isTypeResolver(relationMeta.target)) {
        const reason = 'target must be a type resolver';
        throw new errors_1.InvalidRelationError(reason, relationMeta);
    }
    if (relationMeta.keyTo) {
        // The explict cast is needed because of a limitation of type inference
        return relationMeta;
    }
    const sourceModel = relationMeta.source;
    if (!sourceModel || !sourceModel.modelName) {
        const reason = 'source model must be defined';
        throw new errors_1.InvalidRelationError(reason, relationMeta);
    }
    const targetModel = relationMeta.target();
    debug('Resolved model %s from given metadata: %o', targetModel.modelName, targetModel);
    const defaultFkName = lodash_1.camelCase(sourceModel.modelName + '_id');
    const hasDefaultFkProperty = targetModel.definition &&
        targetModel.definition.properties &&
        targetModel.definition.properties[defaultFkName];
    if (!hasDefaultFkProperty) {
        const reason = `target model ${targetModel.name} is missing definition of foreign key ${defaultFkName}`;
        throw new errors_1.InvalidRelationError(reason, relationMeta);
    }
    return Object.assign(relationMeta, { keyTo: defaultFkName });
}
//# sourceMappingURL=has-many-repository.factory.js.map
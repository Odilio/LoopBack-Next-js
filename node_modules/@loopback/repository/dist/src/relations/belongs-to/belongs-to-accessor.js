"use strict";
// Copyright IBM Corp. 2017,2018. All Rights Reserved.
// Node module: @loopback/example-todo
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
const debugFactory = require("debug");
const errors_1 = require("../../errors");
const type_resolver_1 = require("../../type-resolver");
const belongs_to_repository_1 = require("./belongs-to.repository");
const debug = debugFactory('loopback:repository:belongs-to-accessor');
/**
 * Enforces a BelongsTo constraint on a repository
 */
function createBelongsToAccessor(belongsToMetadata, targetRepoGetter, sourceRepository) {
    const meta = resolveBelongsToMetadata(belongsToMetadata);
    debug('Resolved BelongsTo relation metadata: %o', meta);
    return async function getTargetInstanceOfBelongsTo(sourceId) {
        const foreignKey = meta.keyFrom;
        const primaryKey = meta.keyTo;
        const sourceModel = await sourceRepository.findById(sourceId);
        const foreignKeyValue = sourceModel[foreignKey];
        // tslint:disable-next-line:no-any
        const constraint = { [primaryKey]: foreignKeyValue };
        const constrainedRepo = new belongs_to_repository_1.DefaultBelongsToRepository(targetRepoGetter, constraint);
        return constrainedRepo.get();
    };
}
exports.createBelongsToAccessor = createBelongsToAccessor;
/**
 * Resolves given belongsTo metadata if target is specified to be a resolver.
 * Mainly used to infer what the `keyTo` property should be from the target's
 * property id metadata
 * @param relationMeta belongsTo metadata to resolve
 */
function resolveBelongsToMetadata(relationMeta) {
    if (!type_resolver_1.isTypeResolver(relationMeta.target)) {
        const reason = 'target must be a type resolver';
        throw new errors_1.InvalidRelationError(reason, relationMeta);
    }
    if (!relationMeta.keyFrom) {
        const reason = 'keyFrom is required';
        throw new errors_1.InvalidRelationError(reason, relationMeta);
    }
    const sourceModel = relationMeta.source;
    if (!sourceModel || !sourceModel.modelName) {
        const reason = 'source model must be defined';
        throw new errors_1.InvalidRelationError(reason, relationMeta);
    }
    const targetModel = relationMeta.target();
    const targetName = targetModel.modelName;
    debug('Resolved model %s from given metadata: %o', targetName, targetModel);
    const targetProperties = targetModel.definition.properties;
    debug('relation metadata from %o: %o', targetName, targetProperties);
    if (relationMeta.keyTo) {
        // The explict cast is needed because of a limitation of type inference
        return relationMeta;
    }
    const targetPrimaryKey = targetModel.definition.idProperties()[0];
    if (!targetPrimaryKey) {
        const reason = `${targetName} does not have any primary key (id property)`;
        throw new errors_1.InvalidRelationError(reason, relationMeta);
    }
    return Object.assign(relationMeta, { keyTo: targetPrimaryKey });
}
//# sourceMappingURL=belongs-to-accessor.js.map
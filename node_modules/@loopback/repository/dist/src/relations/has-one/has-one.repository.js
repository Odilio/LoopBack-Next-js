"use strict";
// Copyright IBM Corp. 2017,2018. All Rights Reserved.
// Node module: @loopback/example-todo
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
const repositories_1 = require("../../repositories");
const errors_1 = require("../../errors");
class DefaultHasOneRepository {
    /**
     * Constructor of DefaultHasOneEntityCrudRepository
     * @param getTargetRepository the getter of the related target model repository instance
     * @param constraint the key value pair representing foreign key name to constrain
     * the target repository instance
     */
    constructor(getTargetRepository, constraint) {
        this.getTargetRepository = getTargetRepository;
        this.constraint = constraint;
    }
    async create(targetModelData, options) {
        const targetRepository = await this.getTargetRepository();
        return await targetRepository.create(repositories_1.constrainDataObject(targetModelData, this.constraint), options);
    }
    async get(filter, options) {
        const targetRepository = await this.getTargetRepository();
        const found = await targetRepository.find(Object.assign({ limit: 1 }, repositories_1.constrainFilter(filter, this.constraint)), options);
        if (found.length < 1) {
            // We don't have a direct access to the foreign key value here :(
            const id = 'constraint ' + JSON.stringify(this.constraint);
            throw new errors_1.EntityNotFoundError(targetRepository.entityClass, id);
        }
        return found[0];
    }
}
exports.DefaultHasOneRepository = DefaultHasOneRepository;
//# sourceMappingURL=has-one.repository.js.map
import { Entity, EntityResolver } from '../../model';
import { BelongsToDefinition } from '../relation.types';
/**
 * Decorator for belongsTo
 * @param targetResolver A resolver function that returns the target model for
 * a belongsTo relation
 * @param definition Optional metadata for setting up a belongsTo relation
 * @returns {(target: Object, key:string)}
 */
export declare function belongsTo<T extends Entity>(targetResolver: EntityResolver<T>, definition?: Partial<BelongsToDefinition>): (decoratedTarget: Entity, decoratedKey: string) => void;

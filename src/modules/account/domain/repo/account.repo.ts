import { Filter } from 'types-ddd';

export interface IAccountRepo<Aggregate, Model> {
    save: (aggregate: Aggregate) => Promise<void>;
    findMany: (filter: Filter<Partial<Model>>) => Promise<Aggregate[]>;
    findOne: (filter: Filter<Partial<Model>>) => Promise<Aggregate|null>;
    findAsModel: (filter: Filter<Partial<Model>>) => Promise<Model[]>;
}

export default IAccountRepo;

import { Filter } from 'types-ddd';

export interface IAccountRepo<Aggregate, Model> {
    save: (aggregate: Aggregate) => Promise<void>;
    findMany: (ids: string[]) => Promise<Aggregate[]>;
    findOne: (filter: Filter<Partial<Model>>) => Promise<Aggregate|null>;
    findAsModel: () => Promise<Model[]>;
}

export default IAccountRepo;

import { Filter } from 'types-ddd';

export interface IServiceRepo<Aggregate, Model> {
    save: (aggregate: Aggregate) => Promise<void>;
    findMany: (ids: string[]) => Promise<Aggregate[]>;
    findOne: (filter: Filter<Partial<Model>>) => Promise<Aggregate|null>;
    findAsModel: (ids?: string[]) => Promise<Model[]>;
    findAsByAccountIdModel: (accountId: string) => Promise<Model[]>
}

export default IServiceRepo;

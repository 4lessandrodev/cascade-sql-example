import { MongoDbConfig, MongoURI, MysqlDbConfig, PostgresDbConfig, RedisDbConfig } from '../db.config';
import { DB_NAME, MONGO_USER, MONGO_PASSWORD, MONGO_HOST, MONGO_PORT, IS_PRODUCTION, IS_TESTING, REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } from '@config/env';

describe('db.config', () => {
	it('should mongo config be defined', () => {
		expect(MongoDbConfig).toEqual({
			useNewUrlParser: true,
			useUnifiedTopology: true,
			dbName: DB_NAME
		});
	});

	it('should mongo uri be defined', () => {
		expect(MongoURI).toBe(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${DB_NAME}?authSource=admin`);
	});

	it('should postgres config be defined', () => {
		expect(PostgresDbConfig.type).toBe('postgres');
		expect(PostgresDbConfig.dropSchema).toBe(IS_TESTING);
		expect(PostgresDbConfig.database).toBe(DB_NAME);
		expect(PostgresDbConfig.synchronize).toBe(!IS_PRODUCTION);
		expect(PostgresDbConfig.extra).toEqual({
			ssl: {
				  rejectUnauthorized: false
			}
		});
	});

	it('should mysql config be defined', () => {
		expect(MysqlDbConfig.type).toBe('mysql');
		expect(MysqlDbConfig.dropSchema).toBe(IS_TESTING);
		expect(MysqlDbConfig.database).toBe(DB_NAME);
		expect(MysqlDbConfig.synchronize).toBe(!IS_PRODUCTION);
		expect(MysqlDbConfig.extra).toEqual({
			ssl: {
				  rejectUnauthorized: false
			}
		});
	});

	it('should redis config be defined', () => {
		expect(RedisDbConfig).toEqual({
			host: REDIS_HOST,
			password: REDIS_PASSWORD,
			port: REDIS_PORT
		});
	});
});

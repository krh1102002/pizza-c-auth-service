import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../entity/User';
import { Config } from '.';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: Config.DB_HOST,
    port: Number(Config.DB_PORT),
    username: Config.DB_USERNAME,
    password: 'postgres',
    database: Config.DB_NAME,
    //we have to make this as false in production because it will continiously sync our data with the databases and if we are in production then there may be chance that your data may lost.
    synchronize: Config.NODE_ENV === 'test' || Config.NODE_ENV === 'dev',
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
});

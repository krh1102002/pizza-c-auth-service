import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../entity/User';
import { Config } from '.';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: Config.DB_HOST,
    port: Number(Config.DB_PORT),
    username: Config.DB_USERNAME,
    password: Config.DB_PASSWORD,
    database: Config.DB_NAME,
    //we have to make this as false in production because it will continuously sync our data with the databases and if we are in production then there may be chance that your data may lost.
    synchronize: false,
    logging: false,
    entities: [User], //basically entities means tables
    migrations: [],
    subscribers: [],
});

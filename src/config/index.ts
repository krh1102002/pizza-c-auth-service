import { config } from 'dotenv';
import path from 'node:path';

// ../../.env.${process.env.NODE_ENV} we have use this path for different enviornment like development,production,testing

// i have write cross env package command in the package.json over there if that is in the dev env
config({ path: path.join(__dirname, `../../.env.${process.env.NODE_ENV}`) });

const { PORT, NODE_ENV, DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME } =
    process.env;

export const Config = {
    PORT,
    NODE_ENV,
    DB_HOST,
    DB_PORT,
    DB_USERNAME,
    DB_PASSWORD,
    DB_NAME,
};

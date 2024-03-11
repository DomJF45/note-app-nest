import { Note } from 'src/notes/note.entity';
import { User } from 'src/user/user.entity';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import * as fs from 'fs';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  database: process.env.POSTGRES_DB,
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  ssl: {
    ca: fs.readFileSync('./ca-certificate.crt').toString(),
  },
  entities: [User, Note],
  synchronize: true,
};
export default config;

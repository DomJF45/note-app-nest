import { Note } from 'src/notes/note.entity';
import { User } from 'src/user/user.entity';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import * as fs from 'fs';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  database: 'defaultdb',
  host: 'db-postgresql-nyc3-61668-do-user-16031076-0.c.db.ondigitalocean.com',
  port: 25060,
  username: 'doadmin',
  password: 'AVNS_h-zFGz1TG0x1_CWEqNa',
  ssl: {
    ca: fs.readFileSync('./ca-certificate.crt').toString(),
  },
  entities: [User, Note],
  synchronize: true,
};
export default config;

import { Note } from 'src/notes/note.entity';
import { User } from 'src/user/user.entity';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  database: 'somedb',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password123',
  entities: [User, Note],
  synchronize: true,
};
export default config;

import { Logger } from '@nestjs/common';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { defineConfig } from '@mikro-orm/mysql';
import { User } from './entities/user.entity';

const logger = new Logger('MikroORM');

export default defineConfig({
  entities: [User],
  dbName: 'nestapp',
  password: 'rootpass',
  port: 3306,
  highlighter: new SqlHighlighter(),
  debug: true,
  logger: logger.log.bind(logger),
});
import { indexDb, type IndexDb } from '@/core/db/db_index';
import { documentDb, type DocumentDb } from '@/core/db/document';
import { importSourceDb, type ImportSourceDb } from '@/core/db/importSource';
import { taskDb, type TaskDb } from '@/core/db/task';

export interface Database {
  document: DocumentDb;
  index: IndexDb;
  task: TaskDb;
  importSource: ImportSourceDb,
}

const database = {
  document: documentDb,
  index: indexDb,
  task: taskDb,
  importSource: importSourceDb,
} satisfies Database;

export default database;
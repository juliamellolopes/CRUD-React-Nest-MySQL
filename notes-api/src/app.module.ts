import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as process from 'process';
import { NotesModule } from './notes/notes.module';
import { Note } from './notes/note.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST ?? 'localhost',
      port: Number(process.env.DB_PORT ?? 3306),
      username: process.env.DB_USER ?? 'notes_user',
      password: process.env.DB_PASS ?? 'notes_pass',
      database: process.env.DB_NAME ?? 'notes_db',
      entities: [Note],
      synchronize: true,
      logging: false,
      charset: 'utf8mb4',
    }),
    NotesModule,
  ],
})
export class AppModule { }

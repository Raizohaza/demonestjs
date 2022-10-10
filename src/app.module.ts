import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ActorModule } from './actor/actor.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { FilmModule } from './film/film.module';
import { ConfigModule } from '@nestjs/config';
import { truncate } from 'fs';
@Module({
  imports: [
    ConfigModule,
    ActorModule,
    FilmModule,
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "103.74.117.138",
      port: 3306,
      username: "cuong-21hcb",
      password: "21424003",
      database: "demonestjs",
      entities: [],
      synchronize: false,
      insecureAuth: true,
      autoLoadEntities: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}

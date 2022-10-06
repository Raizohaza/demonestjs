import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ActorModule } from './actor/actor.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { FilmModule } from './film/film.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule,
    ActorModule,
    FilmModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: "remotemysql.com",
      port: 3306,
      username: "XkOMC1ODcV",
      password: "aIVCvBshU3",
      database: "XkOMC1ODcV",
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}

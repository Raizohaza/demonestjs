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
      host: "103.74.117.138",
      port: 21424,
      username: "21hcb-hcmus",
      password: "21424003",
      database: "demonestjs",
      entities: [],
      synchronize: false,
      autoLoadEntities: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}

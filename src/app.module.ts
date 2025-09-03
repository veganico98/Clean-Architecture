import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsModule } from './projects/projects.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ProjectsModule,
      TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'arch',
    synchronize: true, // true só em desenvolvimento, false em produção
    //autoLoadEntities: true, //Carreta entities registradas nos módulos
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

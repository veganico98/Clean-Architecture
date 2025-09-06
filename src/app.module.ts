import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Project } from './app/projects/entities/project.entity';
import { ProjectsModule } from './app/projects/projects.module';
import { UsersModule } from './app/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 3306,
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || 'root',
      database: process.env.DB_NAME || 'arch',
      entities: [Project],
      synchronize: true, // true só ambiente de dev, false só ambiente de prod
      // autoLoadEntities: true, // Carrega entities registradas nos módulos
    }),
    ProjectsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

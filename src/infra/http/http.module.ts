import { Module } from '@nestjs/common';
import { DuplicatesController } from './controllers/duplcates.controller';
import { DatabaseModule } from '../database/database.module';
import { GetDuplicatesUseCase } from 'src/app/use-cases/get-duplicates.use-case';
import { ClientService } from '../database/services/client.service';
import { MergeAllUseCase } from 'src/app/use-cases/merge-all.use-case';

@Module({
  imports: [DatabaseModule],
  controllers: [DuplicatesController],
  providers: [ClientService, GetDuplicatesUseCase, MergeAllUseCase],
})
export class HttpModule {}

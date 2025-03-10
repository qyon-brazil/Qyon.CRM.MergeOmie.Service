import { Controller, Get } from '@nestjs/common';
import { GetDuplicatesUseCase } from 'src/app/use-cases/get-duplicates.use-case';
import { MergeAllUseCase } from 'src/app/use-cases/merge-all.use-case';

@Controller('duplicates')
export class DuplicatesController {
  constructor(
    private readonly getDuplicates: GetDuplicatesUseCase,
    private readonly mergeAll: MergeAllUseCase,
  ) {}

  @Get()
  async get() {
    const duplicates = await this.getDuplicates.execute();

    return { data: duplicates };
  }

  @Get('merge-all')
  async mergeAllRoute() {
    await this.mergeAll.execute();
    return { message: 'ok!' };
  }
}

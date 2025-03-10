import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { SuggestionsRepositoryGateway } from 'src/app/gateways/suggestion.repository.gateway';

@Injectable()
export class KnexSuggestionRepository implements SuggestionsRepositoryGateway {
  constructor(@InjectKnex() private readonly db: Knex) {}

  async changeAllSuggestionsClient({
    newClientId,
    oldClientId,
  }: {
    newClientId: number;
    oldClientId;
  }): Promise<any[]> {
    return await this.db('SUGESTAO')
      .where({ CD_CLIENTE: oldClientId })
      .update({ CD_CLIENTE: newClientId })
      .returning('CD_SUGESTAO');
  }
}

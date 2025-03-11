import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { FavoriteRepositoryGateway } from 'src/app/gateways/favorite.repository.gateway';

@Injectable()
export class KnexFavoriteRepository implements FavoriteRepositoryGateway {
  constructor(@InjectKnex() private readonly db: Knex) {}

  async changeAllFavoritesClient({
    newClientId,
    oldClientId,
  }: {
    newClientId: number;
    oldClientId;
  }): Promise<any[]> {
    return await this.db('FAVORITO')
      .where({ CD_CLIENTE: oldClientId })
      .update({ CD_CLIENTE: newClientId })
      .returning('*');
  }
}

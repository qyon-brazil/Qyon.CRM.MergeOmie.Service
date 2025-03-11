import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { CognitoUserRepositoryGateway } from 'src/app/gateways/cognito-user.repository.gateway';

@Injectable()
export class KnexCognitoUserRepository implements CognitoUserRepositoryGateway {
  constructor(@InjectKnex() private readonly db: Knex) {}

  async changeAllCognitoUsersClient({
    newClientId,
    oldClientId,
  }: {
    newClientId: number;
    oldClientId;
  }): Promise<any[]> {
    return await this.db('USUARIO_COGNITO')
      .where({ CD_CLIENTE: oldClientId })
      .update({ CD_CLIENTE: newClientId })
      .returning('*');
  }
}

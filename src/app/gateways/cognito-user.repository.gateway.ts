export abstract class CognitoUserRepositoryGateway {
    abstract changeAllCognitoUsersClient(props: {
      oldClientId: number;
      newClientId: number;
    }): Promise<any[]>;
  }
  
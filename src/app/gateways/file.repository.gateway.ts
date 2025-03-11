export abstract class FileRepositoryGateway {
    abstract changeAllFilesClient(props: {
      oldClientId: number;
      newClientId: number;
    }): Promise<any[]>;
  }
  
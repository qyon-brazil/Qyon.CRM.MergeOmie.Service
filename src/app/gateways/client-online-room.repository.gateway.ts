export abstract class ClientOnlineRoomRepositoryGateway {
    abstract changeAllClientOnlineRoomsClient(props: {
        oldClientId: number;
        newClientId: number;
    }): Promise<any[]>;
}
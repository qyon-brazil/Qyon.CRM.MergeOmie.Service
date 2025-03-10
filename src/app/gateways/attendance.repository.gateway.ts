export abstract class AttendanceRepositoryGateway {
  abstract changeAllAttendancesClient(props: {
    oldClientId: number;
    newClientId: number;
  }): Promise<any[]>;
}

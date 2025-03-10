import { get } from 'env-var';
import * as dotenv from 'dotenv';

dotenv.config();

export class EnvConfig {
  // -=-=-=-=- DATABASE CONFIGURATION -=-=-=-=-
  public static readonly DB_ADDRESS = get('DB_ADDRESS').asString();
  public static readonly DB_PORT = get('DB_PORT').asPortNumber();
  public static readonly DB_USER = get('DB_USER').asString();
  public static readonly DB_PASSWORD = get('DB_PASSWORD').asString();
  public static readonly DB_DATABASE = get('DB_DATABASE').asString();

  // -=-=-=-=- APPLICATION CONFIGURATION -=-=-=-=-

  public static readonly APPLICATION_PORT =
    get('APPLICATION_PORT').asPortNumber();
}

export class Environment {
  public static isProd: boolean = process.env.NODE_ENV === 'production';
  public static port: number = 3005;

  public static secret: string = '1212~210ODKSAOD1!!@02390)((023';
  public static issuer: string = 'travelbucketapp';

  public static dbHost: string | undefined = process.env.POSTGRES_HOST || process.env.RDS_HOSTNAME;
  public static dbPort: string | undefined = process.env.RDS_PORT;

  public static dbName: string | undefined = 'travelbucket';
  public static dbPass: string | undefined = process.env.DB_PASSWORD || 'password';
  public static dbUser: string | undefined = process.env.DB_USER || 'postgres';
}

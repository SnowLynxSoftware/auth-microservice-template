import { createConnection } from "typeorm";
import { UserEntity } from "../entities/user.entity";
import { LogEntity } from "../entities/log.entity";

/**
 * Handles all of the initial database setup logic.
 */
export class AppDatabase {
  /**
   * Initialize our database connection and setup all of the entities.
   */
  public static async initializeDatabaseConnection(): Promise<void> {
    console.log("HERE");
    const connection = await createConnection({
      ...AppDatabase.getDatabaseConfigOptions(),
      entities: AppDatabase.getDatabaseEntities(),
    });
    if (process.env.NODE_ENV && process.env.NODE_ENV === "development") {
      console.log(
        ` |> Database Connection Status: [${connection.isConnected}]`
      );
    }
  }

  /**
   * Dynamically builds and returns the items from the connection string.
   * The connection string is stored like this:
   *
   * EXAMPLE:
   *
   * "host=localhost;username=name;password=password" etc...
   *
   * This makes it easier for us to dynamically add things to the connection string without having to add more ENV variables.
   */
  private static getDatabaseConfigOptions(): any {
    const { DB_CONNECTION_STRING } = process.env;
    if (DB_CONNECTION_STRING) {
      const items = DB_CONNECTION_STRING.split(";");
      const keyValuePairs: any = {};
      items.forEach((itm) => {
        const keyValuePair = itm.split("=");
        keyValuePairs[keyValuePair[0]] = keyValuePair[1];
      });
      return keyValuePairs;
    } else {
      throw new Error(
        "[DB_CONNECTION_STRING] was not found in your environment!"
      );
    }
  }

  /**
   * Returns the full list of entities that our database should allow.
   * This should be passed into the TypeORM provider when initializing the application.
   */
  public static getDatabaseEntities(): any[] {
    return [UserEntity, LogEntity];
  }
}

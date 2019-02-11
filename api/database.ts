import { EntityDatabase } from "ts-framework-sql";
import Config from "../config";
import * as Models from "./models";

export default class MainDatabase extends EntityDatabase {
  public static readonly ENTITIES = [
    Models.UserModel
  ];

  protected static readonly instance: MainDatabase = new MainDatabase({
    connectionOpts: {
      ...Config.DatabaseConfig,
      entities: Object.values(MainDatabase.ENTITIES)
    }
  } as any);

  /**
   * Gets the singleton database instance.
   */
  static getInstance(): MainDatabase {
    return this.instance;
  }
}
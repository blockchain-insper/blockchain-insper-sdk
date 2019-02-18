import { Column, Entity } from "typeorm";
import { ExtendedEntity } from "../base";
import { extract } from "keyword-extractor";

@Entity(InformationModel.TABLE_NAME)
export default class InformationModel extends ExtendedEntity {
  private static readonly TABLE_NAME = "informations";
  
  @Column({ nullable: false })
  public information: string;

  @Column({ nullable: false })
  public language: string;

  @Column({ nullable: false })
  public type: string;

  @Column({ nullable: false })
  public keywords: string;

  constructor(data: Partial<InformationModel> = {}) {
    super(data);
  }

  public toJSON(): any {
    const base = super.toJSON();
    return {
      firstName: this.information,
      email: this.type,
      ...base
    };
  }
}

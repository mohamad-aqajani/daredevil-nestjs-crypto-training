import { AssetType } from "enums/assets.enum";
import { Column, Entity } from "typeorm";
import { BaseEntity } from "./base-entity.entity";

@Entity()
export class Asset extends BaseEntity {
    @Column()
    name: string;

    @Column()
    symbol: string;

    @Column()
    decimals: number;

    @Column({nullable: true})
    logo: string;

    @Column({type: 'enum', enum: AssetType, default: AssetType.COIN})
    type: AssetType;

    @Column({nullable: true})
    contractAddress: string;

    @Column({nullable: true})
    contractAbi: any;

}
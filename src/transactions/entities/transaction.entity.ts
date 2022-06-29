import { Asset } from "@shared/entities/asset-entity";
import { BaseEntity } from "@shared/entities/base-entity.entity";
import { TransactionStatus } from "enums/transaction-status.enum";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { User } from "users/entities/user.entity";

@Entity()
export class Transaction extends BaseEntity {
    
    @Column()
    sourceAddress: string;

    @Column()
    receiverAddress: string;

    @Column()
    hash: string;

    @Column({nullable:true})
    status?: TransactionStatus;

    @ManyToOne(type => Asset, asset => asset.transactions, {cascade: true}) 
    asset: Asset;
    @ManyToOne(type => User, user => user.transactions, {cascade: true}) 
    user: User; 
}
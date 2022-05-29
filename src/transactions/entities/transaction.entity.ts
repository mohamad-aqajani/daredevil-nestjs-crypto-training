import { Asset } from "@shared/entities/asset-entity";
import { BaseEntity } from "@shared/entities/base-entity.entity";
import { TransactionStatus } from "enums/transaction-status.enum";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity()
export class Transaction extends BaseEntity {
    
    @Column()
    sourceAddress: string;

    @Column()
    receiverAddress: string;

    @Column()
    hash: string;

    @Column()
    status?: TransactionStatus;

    @ManyToOne(type => Asset, asset => asset.transactions, {cascade: true}) 
    @JoinColumn()
    asset: Asset; 
}
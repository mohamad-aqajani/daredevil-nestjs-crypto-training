import { BaseEntity } from '@shared/entities/base-entity.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserStatus } from 'enums/user-status.enum';
import { Role } from 'enums/roles.enum';

@Entity()
export class User extends BaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true, unique: true })
  email: string;

  @Column({ unique: true })
  mobile: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserStatus, default: 'ACTIVE' })
  status: string;

  @Column({ type: 'enum', enum: Role, default: Role.User })
  role: string;

  @BeforeInsert()
  @BeforeUpdate()
  async generatePasswordHash(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 10);
  }
}

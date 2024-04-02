import { User } from '../user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.notes)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => User, (user) => user.sharedNotes)
  @JoinColumn({ name: 'sharedUser' })
  sharedUser: User;

  @Column()
  content: string;

  @CreateDateColumn({ name: 'date_created' })
  dateCreated: Date;

  @UpdateDateColumn({ name: 'date_edited', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  dateEdited: Date;
}

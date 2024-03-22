import { Note } from '../notes/note.entity';
import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ unique: true })
  email: string;

  @OneToMany(() => Note, (note) => note.user)
  notes: Note[];

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}

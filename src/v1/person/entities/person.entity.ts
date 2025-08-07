import { Gender } from '@/common/enums/gender.enum';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Person {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 100 })
    name: string;

    @Column({ type: 'char', nullable: true })
    gender?: Gender;

    @Column({ type: 'varchar', length: 100, nullable: true, unique: true })
    email?: string;

    @Column({ type: 'date' })
    dateOfBirth: Date;

    @Column({ type: 'varchar', length: 100, nullable: true })
    nationality?: string;

    @Column({ type: 'varchar', length: 14, unique: true })
    cpf: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
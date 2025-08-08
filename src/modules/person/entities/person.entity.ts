import { Gender } from '@/common/enums/gender.enum';
import { Address } from '@/modules/person/entities/address.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToOne } from 'typeorm';

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

    @OneToOne(() => Address, { cascade: true, eager: true })
    @JoinColumn()
    address?: Address;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
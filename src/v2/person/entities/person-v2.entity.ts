import { Address } from '@/v2/person/entities/address.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class PersonV2 {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100 })
    name: string;

    @Column({ type: 'varchar', length: 10, nullable: true })
    gender?: string;

    @Column({ type: 'varchar', length: 100, nullable: true, unique: true })
    email?: string;

    @Column({ type: 'date' })
    dateOfBirth: Date;

    @Column({ type: 'varchar', length: 100, nullable: true })
    nationality?: string;

    @Column({ type: 'varchar', length: 11, unique: true })
    cpf: string;

    @OneToOne(() => Address, { cascade: true, eager: true })
    @JoinColumn()
    address: Address;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
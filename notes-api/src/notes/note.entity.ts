import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'notes' })
export class Note {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 120 })
    title!: string;

    @Column({ type: 'text', nullable: true })
    content!: string | null;

    @CreateDateColumn({ type: 'datetime' })
    createdAt!: Date;

    @UpdateDateColumn({ type: 'datetime' })
    updatedAt!: Date;
}

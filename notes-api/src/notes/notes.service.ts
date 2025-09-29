import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './note.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NotesService {
    constructor(
        @InjectRepository(Note)
        private readonly repo: Repository<Note>,
    ) { }

    async findAll(): Promise<Note[]> {
        return this.repo.find({ order: { updatedAt: 'DESC' } });
    }

    async findOne(id: number): Promise<Note> {
        const note = await this.repo.findOne({ where: { id } });
        if (!note) throw new NotFoundException(`Nota ${id} não encontrada`);
        return note;
    }

    async create(data: CreateNoteDto): Promise<Note> {
        const note = this.repo.create({
            title: data.title.trim(),
            content: data.content?.trim() ?? null,
        });
        return this.repo.save(note);
    }

    async update(id: number, data: UpdateNoteDto): Promise<Note> {
        const note = await this.findOne(id);
        if (typeof data.title !== 'undefined') note.title = data.title.trim();
        if (typeof data.content !== 'undefined') note.content = data.content?.trim() ?? null;
        return this.repo.save(note);
    }

    async remove(id: number): Promise<void> {
        const note = await this.findOne(id);
        await this.repo.remove(note);
    }
}

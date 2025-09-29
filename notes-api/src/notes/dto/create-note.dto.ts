import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateNoteDto {
    @IsString()
    @IsNotEmpty({ message: 'title é obrigatório' })
    @MaxLength(120, { message: 'title pode ter no máximo 120 caracteres' })
    title!: string;

    @IsOptional()
    @IsString()
    content?: string;
}

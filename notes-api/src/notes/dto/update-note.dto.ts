import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateNoteDto {
    @IsOptional()
    @IsString()
    @MaxLength(120, { message: 'title pode ter no máximo 120 caracteres' })
    title?: string;

    @IsOptional()
    @IsString()
    content?: string;
}

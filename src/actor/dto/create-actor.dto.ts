import { IsNotEmpty, IsString } from 'class-validator';

export class CreateActorDto {
  @IsNotEmpty()
  @IsString()
  first_name: string;
  @IsNotEmpty()
  @IsString()
  last_name: string;
  last_update: Date = new Date();
}

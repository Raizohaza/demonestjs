import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateActorDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  first_name: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  last_name: string;
  last_update: Date = new Date();
}

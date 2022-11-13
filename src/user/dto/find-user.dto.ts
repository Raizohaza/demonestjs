import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class FindUserDto {
    @IsNotEmpty()
    @ApiProperty({ type: String, name: 'email' })
    email: string;
    @IsNotEmpty()
    @ApiProperty({ type: String, name: 'name' })
    name: string;
    @IsNotEmpty()
    @ApiProperty({ type: String, name: 'password' })
    password: string;
}

export default FindUserDto;

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class LoginDto {
    @IsNotEmpty()
    @ApiProperty({ type: String, name: 'email' })
    email: string;
    @IsNotEmpty()
    @ApiProperty({ type: String, name: 'password' })
    password: string;
}

export default LoginDto;

import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    frist_name : string;

    @IsString()
    @IsNotEmpty()
    last_name : string;

    @IsString()
    @IsNotEmpty()
    email : string;
    
    @IsNotEmpty()
    password: string;
}

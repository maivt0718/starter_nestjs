import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsEmpty, IsNotEmpty } from "class-validator"

export class LoginDto{
    @IsEmail({}, {message: "Must be under the email format"})
    @ApiProperty()
    email: string

    @IsNotEmpty({message: "Password is not blank"})
    @ApiProperty()
    password: string
}
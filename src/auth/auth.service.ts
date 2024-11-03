import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaClient } from '@prisma/client';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  prisma = new PrismaClient()
  

  async login(body: LoginDto): Promise<any>{
    try {
      let {email, password} = body

      let checkUser = await this.prisma.users.findFirst({
        where: {email}
      })

      if(!checkUser){
        throw new BadRequestException("Email is wrong")
      }

      const checkPassword = checkUser.pass_word === password

      if(!checkPassword){
        throw new BadRequestException("Password is wrong")
      }
      return "token"
    } catch (error) {
      throw new Error(error)
    }
  }
}

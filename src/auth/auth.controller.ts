import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
import { MailService } from 'src/email/email.service';
import { EmailDto } from './dto/email.dto';

@ApiTags('Auth session')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    private readonly emailService: MailService
  ) {}

  @Post()
  create(@Body() createAuthDto: CreateAuthDto) {
    // return this.authService.create(createAuthDto);
  }

  @Post("/login")
  async login(
    @Body() body: LoginDto,
    @Res() res: Response
  ):Promise<any>{
    try {
      const result = await this.authService.login(body)
      return res.status(HttpStatus.OK).json(result)
    } catch (error) {
  
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: error.message})
    }
  }

  @Post('/send-email')
  @ApiBody({
    type: EmailDto
  })
  async sendEmail(
    @Body() body: EmailDto,
    @Res() res: Response
  ){
    try {
      let emailTo = body.email;
      let subject = body.subject;
      let text = body.text;
      await this.emailService.sendMail(emailTo,subject,text)
      return res.status(HttpStatus.OK).json({message: "Send mail successfully"})
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: "Send mail failed"})
    }
  }
}

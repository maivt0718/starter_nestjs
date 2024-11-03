import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {createTransport, Transporter} from "nodemailer"

@Injectable()
export class MailService{
    private transporter: Transporter;

    constructor(private configService: ConfigService){
        this.transporter = createTransport({
            host: 'smtp',
            port: 587,
            auth: {
                user: this.configService.get<string>('MAIL_USER'),
                pass: this.configService.get<string>('MAIL_PASS')
            }
        })
    }
    async sendMail(to:string,subject: string,text:string,html?:string){
        const mailOptions = {
            from: this.configService.get<string>('MAIL_USER'),
            to,
            subject,
            text,
            html
        }
        return await this.transporter.sendMail(mailOptions);
    }
}
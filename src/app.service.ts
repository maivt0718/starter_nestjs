import { Injectable } from '@nestjs/common';

// As controller in express
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}

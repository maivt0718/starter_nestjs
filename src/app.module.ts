import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VideoModule } from './video/video.module';

@Module({
  imports: [VideoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// As primary of module, to connect to the sub modules

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VideoModule } from './video/video.module';
import { ConfigModule} from '@nestjs/config'
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}), // load all environment variables
    VideoModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// As primary of module, to connect to the sub modules

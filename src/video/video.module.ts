import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { SharedModule } from 'src/shared/share.module';
import { JwtStrategy } from 'src/strategy/jwt.strategy';
import { KeyService } from 'src/key/key.service';
import { KeyModule } from 'src/key/key.module';

@Module({
  controllers: [VideoController],
  providers: [VideoService, JwtStrategy],
  imports: [SharedModule, KeyModule]
})
export class VideoModule {}

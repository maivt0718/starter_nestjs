import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpStatus, Res, Headers, Req } from '@nestjs/common';
import { VideoService } from './video.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { Request, Response } from 'express';
import { VideoDto } from './dto/video.dto';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post('/create_video')
  create(@Body() createVideoDto: CreateVideoDto,
  @Res() res: Response
) {
    
    return res.status(HttpStatus.OK).json(createVideoDto)
  }

  @Get(`/getAllVideo`)
  async findAll(
    @Query('page') page: string,
    @Query('size') size: string,
    @Query(`keyword`) keyword: string,
    @Headers(`token`) token: string,
    @Res() res: Response,
    // @Req() req:Request
  ): Promise<Response<VideoDto[]>> {
    // let header = req.headers.token
    try {
      const formatPage = page ? Number(page) : 1
      const formatSize = size ? Number(size) : 1
      let videos = await this.videoService.findAll(formatPage, formatSize, keyword)
      return res.status(HttpStatus.OK).json(videos)
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: error})
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto) {
    return this.videoService.update(+id, updateVideoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videoService.remove(+id);
  }
}

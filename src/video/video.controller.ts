import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpStatus, Res, Headers, Req, UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common';
import { VideoService } from './video.service';
import { CreateVideoDto, FilesUploadDitio, fileUploadDitio } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { Response } from 'express';
import { VideoDto } from './dto/video.dto';
import { ApiBody, ApiConsumes, ApiHeader, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { getStorageOptions } from 'src/shared/upload.service';
import { Express } from 'express'
import { CloudUploadService } from 'src/shared/cloudinary.service';

@ApiTags(`Video session`)
@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService,
    private readonly cloudUploadService: CloudUploadService
  ) {}

  @Post('/create_video')
  async create(@Body() createVideoDto: CreateVideoDto,
  @Res() res: Response
) {
    let newVideo = await this.videoService.create(createVideoDto)
    return res.status(HttpStatus.CREATED).json(newVideo)
  }

  @Get(`/getAllVideo`)
  @ApiQuery({name: "page", required: false, type: Number})
  @ApiQuery({name: "size", required: false, type: Number})
  @ApiQuery({name: "keyword", required: false, type: String})
  @ApiHeader({name: "token", required: false})
  @ApiResponse({status: HttpStatus.OK, description: `Get all video is succeeded`})
  @ApiResponse({status: HttpStatus.INTERNAL_SERVER_ERROR, description: `Internal server`})
  async findAll(
    @Query('page') page: number,
    @Query('size') size: number,
    @Query(`keyword`) keyword: string,
    @Headers(`token`) token: string,
    @Res() res: Response,
    // @Req() req:Request
  ): Promise<Response<VideoDto[]>> {
    // let header = req.headers.token
    try {
      const formatPage = page ? Number(page) : 1
      const formatSize = size ? Number(size) : 10
      let videos = await this.videoService.findAll(formatPage, formatSize, keyword)
      return res.status(HttpStatus.OK).json(videos)
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: error})
    }
  }

  @Post('/upload_thumbnail')
  @ApiConsumes('multipart/form-data')
  @ApiBody({type: fileUploadDitio, required: true})
  @UseInterceptors(FileInterceptor('image', {storage: getStorageOptions('video')}))
  uploadThumbnail(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response
  ){
    return res.status(HttpStatus.OK).json(file)
  }

  @Post("/upload_thubnail_cloud")
  @ApiConsumes('multipart/form-data')
  @ApiBody({type: fileUploadDitio, required: true})
  @UseInterceptors(FileInterceptor('image'))
  async uploadThumbnailToCloud(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response
  ){
    try {
      const result = await this.cloudUploadService.uploadImage(file, 'videos')
      return res.status(HttpStatus.OK).json(result)
    } catch (error) {
      console.log(error)
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: `Upload failed`})
    }
  }

  @Post('/upload_multiple_thumbnail')
  @ApiConsumes('multipart/form-data')
  @ApiBody({type: FilesUploadDitio, required: true})
  @UseInterceptors(FilesInterceptor('images', 20, {storage: getStorageOptions('videos')}))
  uploadMultiThumbnail(
    @UploadedFiles() files: Express.Multer.File[],
    @Res() res: Response
  ){
    return res.status(HttpStatus.OK).json(files)
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

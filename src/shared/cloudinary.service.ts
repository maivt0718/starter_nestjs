import { Inject, Injectable } from '@nestjs/common';
import { UploadApiResponse } from 'cloudinary';

@Injectable()
export class CloudUploadService {
  constructor(@Inject('CLOUDINARY') private cloudinary) {}

  async uploadImage(
    file: Express.Multer.File,
    folder: string,
  ): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const uploadStream = this.cloudinary.uploader.upload_stream({
        folder, // define folder on cloudinary to save images
      },
      (error: any, result: UploadApiResponse) => {
        error?reject(error):resolve(result)
      }
    );
    uploadStream.end(file.buffer)
    });
  }
}

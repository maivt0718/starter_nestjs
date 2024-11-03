import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty } from "class-validator";
import { VideoType } from "../enum/video_type.enum";

export class CreateVideoDto {
    @IsNotEmpty({message: "Video is required"})
    @ApiProperty() // show property in swagger
    video_name: string;

    @IsNotEmpty({message: "Decription is required"})
    @ApiProperty() // show property in swagger
    description: string; 
    
    @IsNotEmpty({message: "Thumbnail is required"})
    @ApiProperty() // show property in swagger
    thumbnail: string;

    @ApiProperty() // show property in swagger
    views: number;

    @IsNotEmpty({message: "Source video is required"})
    @ApiProperty() // show property in swagger
    source: string;

    @IsNotEmpty({message: "Video is required"})
    @ApiProperty() // show property in swagger
    user_id: number;

    @ApiProperty({enum: VideoType}) // show property in swagger
    @IsEnum(VideoType)
    type_id: number;
}

export class fileUploadDitio{
    @ApiProperty({type: 'string', format: 'binary'})
    image: any
}

export class FilesUploadDitio{
    @ApiProperty({type: 'array', items: {
        type: 'string',
        format: 'binary'
    }})
    images: any[]
}

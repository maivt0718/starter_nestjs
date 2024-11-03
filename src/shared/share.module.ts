import { Module } from "@nestjs/common";
import { CloudinaryModule } from "src/cloudinary/cludinary.module";
import { CloudUploadService } from "./cloudinary.service";

@Module({
    imports: [CloudinaryModule],
    providers: [CloudUploadService],
    exports: [CloudUploadService]
})
export class SharedModule{}
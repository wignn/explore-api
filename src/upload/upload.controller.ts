import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';


@Controller('api/upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file): Promise<{
    data:{
      url:string
    }
  }> {
    const fileUrl = await this.uploadService.uploadFile(file);
    
    if (!fileUrl) {
      throw new Error('Failed to upload file');
    }
    return fileUrl;
  }
}

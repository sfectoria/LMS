import { AppService } from './app.service';
import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import multer, { diskStorage, Multer } from 'multer';
import { extname } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
const multerConfig = {
  dest: 'upload',
};
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req: any, file: any, cb: any) => {
          const uploadPath = multerConfig.dest;
          //  Create folder if doesn't exist
          if (!existsSync(uploadPath)) {
            mkdirSync(uploadPath);
            console.log('mkdir upload');
          }
          cb(null, uploadPath);
        },
        filename: (req: any, file: any, cb: any) => {
          //  Generating a 32 random chars long string
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          //  Calling the callback passing the random name generated with
          // the original extension name
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),


      
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File, @Body() dto: any) {
    console.log(file, 'file');
    let data = {
      description: dto.description,
      alt: dto.alt,
      extension: file.filename.split('.')[1],
      type: file.mimetype,
      path: 'http://localhost:5000/' + 'upload/' + file.filename,
    };
    return data;
  }
}

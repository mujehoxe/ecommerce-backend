import { Controller, Get, Header, Param, StreamableFile } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('uploads')
export class FileController {
  @Get(':filename')
  @Header('Content-Type', 'image')
  getFile(@Param('filename') filename: string): StreamableFile {
    const file = createReadStream(join(process.cwd(), 'uploads', filename));
    return new StreamableFile(file);
  }
}

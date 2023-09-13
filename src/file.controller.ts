import {
  Controller,
  Get,
  Header,
  NotFoundException,
  Param,
  StreamableFile,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import { createReadStream } from 'fs';
import { extname, join } from 'path';
import { existsSync } from 'node:fs';

@Controller({ path: 'uploads', version: VERSION_NEUTRAL })
export class FileController {
  @Get(':filename')
  @Header('Content-Type', 'image')
  async getFile(@Param('filename') filename: string): Promise<StreamableFile> {
    try {
      const filePath = join(process.cwd(), 'uploads', filename);

      if (!existsSync(filePath)) {
        throw new NotFoundException('File not found');
      }

      const file = createReadStream(filePath);
      const fileExtension = extname(filename).toLowerCase();
      return new StreamableFile(file, { type: `image/${fileExtension}` });
    } catch (error) {
      throw new NotFoundException('File not found', error);
    }
  }
}

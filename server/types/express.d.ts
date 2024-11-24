import { Express } from 'express-serve-static-core';
import { Multer } from 'multer';

declare global {
  namespace Express {
    namespace Multer {
      interface File {
        originalname: string;
        buffer: Buffer;
      }
    }
  }
}
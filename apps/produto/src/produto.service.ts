import { Injectable } from '@nestjs/common';

@Injectable()
export class ProdutoService {
  getHello(): string {
    return 'Hello World!';
  }
}

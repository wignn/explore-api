import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async working():Promise<string>{
    return 'working';
  }

  async doc():Promise<string> {
    return 'Hello World!';
  }
}

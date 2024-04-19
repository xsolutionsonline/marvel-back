import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly marvelService: AppService) {}

  @Get()
  async getMarvelCharacters(): Promise<any> {
    try {
      const characters = await this.marvelService.getCharacters(20);
      return characters;
    } catch (error) {
      console.error('Error al obtener los personajes de Marvel:', error);
      throw error;
    }
  }
}

import axios, { AxiosResponse } from 'axios';
import { Injectable } from '@nestjs/common';
import { Md5 } from 'ts-md5';

@Injectable()
export class AppService {
  private readonly apiUrl = 'https://gateway.marvel.com:443/v1/public';
  private readonly apiKey = '4c972a969a9d52bfc9cf112f4b9e14e2';
  private readonly privateKey = '43e8e37620beff674cf5e4238ec329480b0bd100';

  constructor() {}

  async getCharacters(limit: number = 10): Promise<any> {
    const timestamp = new Date().getTime().toString();
    const hash = Md5.hashStr(timestamp + this.privateKey + this.apiKey);

    try {
      const response: AxiosResponse = await axios.get(
        `${this.apiUrl}/characters`,
        {
          params: {
            limit,
            apikey: this.apiKey,
            ts: timestamp,
            hash: hash.toString(),
          },
        },
      );

      return response.data;
    } catch (error) {
      console.error('Error al obtener los personajes de Marvel:', error);
      throw error;
    }
  }
}

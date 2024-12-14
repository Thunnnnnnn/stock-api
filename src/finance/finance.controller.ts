import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Query,
} from '@nestjs/common';
import yFinance from 'yahoo-finance2';
import { Quote } from 'yahoo-finance2/dist/esm/src/modules/options';
import { SearchResult } from 'yahoo-finance2/dist/esm/src/modules/search';

@Controller('finance')
export class FinanceController {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: any) {}
  @Get()
  async findStock(
    @Query('type') type: 'symbol' | 'name',
    @Query('name') name: string,
  ): Promise<object> {
    let result: Quote | SearchResult;
    if (!type || !name) {
      throw new HttpException(
        'Type and name is required',
        HttpStatus.BAD_REQUEST,
      );
    }

    const typesName = await this.cacheManager.get(`${type}_${name}`);

    if (typesName) {
      return typesName;
    }

    if (type !== 'symbol' && type !== 'name') {
      throw new HttpException(
        'Type must be symbol or name',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      if (type === 'name') {
        result = await yFinance.search(name);
      } else {
        result = await yFinance.quote(name);
      }

      await this.cacheManager.set(`${type}_${name}`, result, 1000 * 60); // clear cache after 1 minute
    } catch (error) {
      throw new Error(
        `Skipping yf.quote("${name}"): [${error.name}] ${error.message}`,
      );
    }

    if (!result || Object.keys(result).length === 0) {
      throw new HttpException('No data found', HttpStatus.NOT_FOUND);
    }

    return result;
  }
}

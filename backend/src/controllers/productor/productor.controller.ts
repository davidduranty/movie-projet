import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Productor } from 'backend/src/entities/productor.entity';
import { ProductorService } from 'backend/src/services/productor/productor.service';
import { HttpStatus } from 'backend/src/utils/http-status';

@Controller('productors')
class ProductorController {
  constructor(private readonly _productorService: ProductorService) {}

  @Get('all')
  @ApiOperation({
    summary: 'Getting all Productors',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'All Productors',
  })
  public async getAllProductor(): Promise<Productor[]> {
    return await this._productorService.getAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a productor by id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'A productor by id',
  })
  public async get(@Param('id') id: number): Promise<Productor[]> {
    return await this._productorService.get(id);
  }
}
export { ProductorController };

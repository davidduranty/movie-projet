import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Productor } from 'backend/src/entities/productor.entity';
import { ProductorDto } from 'backend/src/models/productor.dto';
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
  public async getAllProductor(): Promise<ProductorDto[]> {
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
  public async get(@Param('id') id: number): Promise<ProductorDto[]> {
    return await this._productorService.get(id);
  }

  @Post('add-productor')
  @ApiOperation({
    summary: 'Add a productor',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'A productor add',
  })
  public async post(@Body() data: { productorDto: ProductorDto }) {
    const { productorDto } = data;
    return await this._productorService.post(productorDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a productor',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'A productor Delete',
  })
  public async remove(@Param('id') id: number): Promise<void> {
    await this._productorService.removeProductore(id);
  }
}
export { ProductorController };

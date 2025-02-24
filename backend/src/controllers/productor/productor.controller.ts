import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProductorDto } from '../../models/productor.dto';
import { ProductorService } from '../../services/productor/productor.service';
import { HttpStatus } from '../../utils/http-status';

@Controller('productors')
class ProductorController {
  constructor(private readonly _productorService: ProductorService) { }

  @Get('all')
  @ApiOperation({
    summary: 'Getting all Productors',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'All Productors',
  })
  public async getAllProductor(): Promise<ProductorDto[]> {
    const result = await this._productorService.getAll();
    if (!result) {
      throw new Error(`Productor ${HttpStatus.NOT_FOUND}`);
    }
    return result
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a productor by id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'A productor by id',
  })
  public async get(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<ProductorDto[]> {
    const result = await this._productorService.get(id);
    if (!result) {
      throw new Error(`Productor ${HttpStatus.NOT_FOUND}`);
    }
    return result;
  }

  @Post('add-productor')
  @ApiOperation({
    summary: 'Add a productor',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'A productor add',
    type: ProductorDto,
  })
  public async post(
    @Body(new ValidationPipe()) data: { productorDto: ProductorDto },
  ) {
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
  public async remove(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<void> {
    const productor = await this._productorService.removeProductor(id);
    if (!productor) {
      throw new Error(`Productor ${HttpStatus.NOT_FOUND}`);
    }
  }
}
export { ProductorController };

import { Test, TestingModule } from '@nestjs/testing';
import { ProductorService } from './productor.service';

describe('ProductorService', () => {
  let service: ProductorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductorService],
    }).compile();

    service = module.get<ProductorService>(ProductorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

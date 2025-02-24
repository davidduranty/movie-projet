import { Test, TestingModule } from '@nestjs/testing';
import { ProductorController } from './productor.controller';
import { ProductorService } from '../../services/productor/productor.service';

const mockProductorService = {
  getAll: jest.fn(),
  get: jest.fn(),
  post: jest.fn(),
  removeProductore: jest.fn(),
};

describe('ProductorController', () => {
  let productorController: ProductorController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProductorController],
      providers: [
        {
          provide: ProductorService, // Remplace le service par son mock
          useValue: mockProductorService,
        },
      ],
    }).compile();

    productorController = app.get<ProductorController>(ProductorController);
  });

  it('should be defined', () => {
    expect(productorController).toBeDefined();
  });

  // describe('root', () => {
  //   it('should return "Hello World!"', () => {
  //     expect(appController.getHello()).toBe('Hello World!');
  //   });
  // });
});

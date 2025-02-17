import { Test, TestingModule } from '@nestjs/testing';
import { ProductorController } from './productor.controller';
import { MovieService } from '../../services/movie/movie.service';

describe('ProductorController', () => {
  let appController: ProductorController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProductorController],
      providers: [MovieService],
    }).compile();

    appController = app.get<ProductorController>(ProductorController);
  });

  // describe('root', () => {
  //   it('should return "Hello World!"', () => {
  //     expect(appController.getHello()).toBe('Hello World!');
  //   });
  // });
});

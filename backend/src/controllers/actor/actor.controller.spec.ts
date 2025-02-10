import { Test, TestingModule } from '@nestjs/testing';
import { ActorController } from './actor.controller';
import { MovieService } from '../../services/movie/movie.service';

describe('AppController', () => {
  let appController: ActorController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ActorController],
      providers: [MovieService],
    }).compile();

    appController = app.get<ActorController>(ActorController);
  });

  // describe('root', () => {
  //   it('should return "Hello World!"', () => {
  //     expect(appController.getHello()).toBe('Hello World!');
  //   });
  // });
});

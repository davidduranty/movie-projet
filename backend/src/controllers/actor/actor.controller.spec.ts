import { Test, TestingModule } from '@nestjs/testing';
import { ActorController } from './actor.controller';
import { ActorService } from '../../services/actor/actor.service';

const mockActorService = {
  getAll: jest.fn(),
  getById: jest.fn(),
  getByCountry: jest.fn(),
  getByName: jest.fn(),
  post: jest.fn(),
  removeId: jest.fn(),
};

describe('ActorController', () => {
  let actorController: ActorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActorController],
      providers: [
        {
          provide: ActorService, 
          useValue: mockActorService,
        },
      ],
    }).compile();

    actorController = module.get<ActorController>(ActorController);
  });

  it('should be defined', () => {
    expect(actorController).toBeDefined();
  });

  // describe('root', () => {
  //   it('should return "Hello World!"', () => {
  //     expect(appController.getHello()).toBe('Hello World!');
  //   });
  // });
});

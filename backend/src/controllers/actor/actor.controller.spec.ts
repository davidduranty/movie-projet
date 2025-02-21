import { Test, TestingModule } from '@nestjs/testing';
import { ActorController } from './actor.controller';
import { ActorService } from '../../services/actor/actor.service';
import { NotFoundException } from '@nestjs/common';

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
  let actorService: ActorService;

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
    actorService = module.get<ActorService>(ActorService);
  });

  it('should be defined', () => {
    expect(actorController).toBeDefined();
  });

  describe('getAllActor', () => {
    it('should Getting all Actor', async () => {
      //Arrange
      const mockActor = [
        {
          id: 1,
          lastname: 'Hanks',
          firstname: 'Tom',
          country: 'USA',
          start: '1975-02-05',
          end: null,
          productorId: 42,
          movieId: 100,
        },
        {
          id: 2,
          lastname: 'Doe',
          firstname: 'John',
          country: 'USA',
          start: '1975-02-06',
          end: null,
          productorId: 43,
          movieId: 101,
        },
      ];
      mockActorService.getAll.mockResolvedValue(mockActor);
      //Act
      const result = await actorController.getAllActor()
      //Assert
      expect(result).toEqual(mockActor)
      expect(actorService.getAll).toHaveBeenCalledTimes(1)
    })
  })
  describe('get', () => {
    it('should a actor by id', async () => {
      //Arrange
      const mockActor = {
        id: 1,
        lastname: 'Hanks',
        firstname: 'Tom',
        country: 'USA',
        start: '1975-02-05',
        end: null,
        productorId: 42,
        movieId: 100,
      }
      mockActorService.getById.mockResolvedValue(mockActor);
      //Act
      const result = await actorController.get(1)
      //Assert
      expect(result).toEqual(mockActor);
      expect(actorService.getById).toHaveBeenCalledWith(1)
    })
    it('should no actor found', async () => {
      //Arrange
      mockActorService.getById.mockResolvedValue(null);
      //Act && Assert
      await expect(actorController.get(0)).rejects.toThrow(NotFoundException)
      expect(actorService.getById).toHaveBeenCalledWith(0)
    })
  })
  describe('getCountry', () => {
    it('should Search a actor with country', async () => {
      //Arrange
      const mockCountry = {
        id: 1, country: 'USA'
      }
      mockActorService.getByCountry.mockResolvedValue(mockCountry);
      //Act
      const result = await actorController.getCountry('USA');
      //Assert
      expect(result).toEqual(mockCountry);
      expect(actorService.getByCountry).toHaveBeenCalledWith('USA')
    })
    it('should Search a actor with country no found', async () => {
      //Arrange
      mockActorService.getByCountry.mockResolvedValue([]);
      //Act
      const result = await actorController.getCountry('USA');
      //Assert
      expect(result).toEqual([]);
      expect(actorService.getByCountry).toHaveBeenCalledWith('USA')
    })
    describe('getName', () => {
      it('should Get a actor by name', async () => {
        //Arrange
        const mockActorName = {
          id: 1,
          lastname: 'Hanks',
          firstname: 'Tom',
          country: 'USA',
          start: '1975-02-05',
          end: null,
          productorId: 42,
          movieId: 100,
        }
        mockActorService.getByName.mockResolvedValue(mockActorName);
        //Act
        const result = await actorController.getName('Hanks');
        //Assert
        expect(result).toEqual(mockActorName);
        expect(actorService.getByName).toHaveBeenCalledWith('Hanks');
      })
      it('should actor not found', async () => {
        //Arrange
        mockActorService.getByName.mockResolvedValue(undefined);
        //Act && Assert
        await expect(actorController.getName('Hanks')).rejects.toThrow(Error);
        expect(actorService.getByName).toHaveBeenCalledWith('Hanks');
      })
    })
    describe('removeId', () => {
      it('should Delete a actor by id', async () => {
        //Arrange

        mockActorService.removeId.mockResolvedValue(true)
        //Act
        const result = await actorController.removeId(1);
        //Assert
        expect(result).toBeUndefined();
        expect(mockActorService.removeId).toHaveBeenCalledWith(1);
      })
      it('should a actor by id not found', async () => {
        //Arrange
        mockActorService.removeId.mockResolvedValue(null)
        //Act && Assert
        await expect(actorController.removeId).rejects.toThrow(Error);
        expect(mockActorService.removeId).toHaveBeenCalledWith(1);
      })
    })
  })

  // describe('root', () => {
  //   it('should return "Hello World!"', () => {
  //     expect(appController.getHello()).toBe('Hello World!');
  //   });
  // });
});

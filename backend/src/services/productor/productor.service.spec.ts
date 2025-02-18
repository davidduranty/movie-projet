import { Test, TestingModule } from '@nestjs/testing';
import { ProductorService } from './productor.service';
import { EntityManager } from '@mikro-orm/core';
import { Productor } from '../../entities/productor.entity';
import { getRepositoryToken } from '@mikro-orm/nestjs';

const mockProductorRepository = {
  find: jest.fn(),
  nativeDelete: jest.fn(),
  persistAndFlush: jest.fn(),
};

const mockEntityManager = {
  persistAndFlush: jest.fn(), // Si tu veux mocker persistAndFlush
};

describe('ProductorService', () => {
  let productorService: ProductorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductorService,
        {
          provide: getRepositoryToken(Productor),
          useValue: mockProductorRepository,
        },
        {
          provide: EntityManager,
          useValue: mockEntityManager, // Si tu n'as pas besoin de mocks spécifiques pour EntityManager
        },
      ],
    }).compile();

    productorService = module.get<ProductorService>(ProductorService);
  });

  it('should be defined', () => {
    expect(productorService).toBeDefined();
  });

  describe('getAll', () => {
    it('should a array of ProductorDto', async () => {
      //Arrange
      const mockProductors = [
        { id: 1, Lastname: 'Duranty', firstname: 'David', age: 49, now: true },
        { id: 1, Lastname: 'Durant', firstname: 'Davis', age: 19, now: false },
      ];
      mockProductorRepository.find.mockResolvedValue(mockProductors);
      //Act
      const result = await productorService.getAll();
      //Assert
      expect(result).toEqual(mockProductors); // Le résultat doit être égal à mockProductors
      expect(mockProductorRepository.find).toHaveBeenCalled(); // Vérifie que la méthode 'find' a bien été appelée
      expect(mockProductorRepository.find).toHaveBeenCalledWith(
        {},
        expect.any(Object),
      ); // Vérifie les arguments passés à 'find'
    });
    // it('should return an empty array if no productors are found', async () => {
    //   // Arrange: configuration du mock pour simuler un retour vide
    //   mockProductorRepository.find.mockResolvedValue([]);

    //   // Act: appel de la méthode
    //   const result = await productorService.getAll();

    //   // Assert: vérification que le résultat est bien un tableau vide
    //   expect(result).toEqual([]); // L'array doit être vide
    // });
    // it('should handle errors gracefully', async () => {
    //   // Arrange: configuration du mock pour simuler une erreur
    //   mockProductorRepository.find.mockRejectedValue(
    //     new Error('Database error'),
    //   );

    //   // Act & Assert: vérifier que l'erreur est gérée
    //   await expect(productorService.getAll()).rejects.toThrowError(
    //     'Database error',
    //   ); // On s'attend à ce que l'erreur soit lancée
    // });
  });
  describe('get', () => {
    it('should return a productor by id', async () => {
      //Arrange
      const mockProductor = {
        id: 1,
        lastname: 'Speilberg',
        firstname: 'Steven',
        age: 65,
        now: true,
      };
      mockProductorRepository.find.mockResolvedValue([mockProductor]);
      //Act
      const result = await productorService.get(1);
      //Assert
      expect(result).toEqual([mockProductor]);
      expect(mockProductorRepository.find).toHaveBeenCalledWith(
        { id: 1 },
        expect.any(Object),
      );
    });
  });
});

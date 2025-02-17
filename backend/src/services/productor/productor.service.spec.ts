import { Test, TestingModule } from '@nestjs/testing';
import { ProductorService } from './productor.service';
import { EntityRepository } from '@mikro-orm/core';
import { Productor } from 'backend/src/entities/productor.entity';

const mockProductorRepository = {
  find: jest.fn(),
};

describe('ProductorService', () => {
  let service: ProductorService;
  let productorRepository: EntityRepository<Productor>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductorService,
        {
          provide: EntityRepository,
          useValue: mockProductorRepository,
        },
      ],
    }).compile();

    service = module.get<ProductorService>(ProductorService);
    productorRepository =
      module.get<EntityRepository<Productor>>(EntityRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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
      const result = await service.getAll();
      //Assert
      expect(result).toEqual(mockProductors); // Le résultat doit être égal à mockProductors
      expect(mockProductorRepository.find).toHaveBeenCalled(); // Vérifie que la méthode 'find' a bien été appelée
      expect(mockProductorRepository.find).toHaveBeenCalledWith(
        {},
        expect.any(Object),
      ); // Vérifie les arguments passés à 'find'
    });
    it('should return an empty array if no productors are found', async () => {
      // Arrange: configuration du mock pour simuler un retour vide
      mockProductorRepository.find.mockResolvedValue([]);

      // Act: appel de la méthode
      const result = await service.getAll();

      // Assert: vérification que le résultat est bien un tableau vide
      expect(result).toEqual([]); // L'array doit être vide
    });
    it('should handle errors gracefully', async () => {
      // Arrange: configuration du mock pour simuler une erreur
      mockProductorRepository.find.mockRejectedValue(
        new Error('Database error'),
      );

      // Act & Assert: vérifier que l'erreur est gérée
      await expect(service.getAll()).rejects.toThrowError('Database error'); // On s'attend à ce que l'erreur soit lancée
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { ProductorController } from './productor.controller';
import { ProductorService } from '../../services/productor/productor.service';
import { ProductorDto } from 'backend/src/models/productor.dto';

const mockProductorService = {
  getAll: jest.fn(),
  get: jest.fn(),
  post: jest.fn(),
  removeProductor: jest.fn(),
};

describe('ProductorController', () => {
  let productorController: ProductorController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProductorController],
      providers: [
        {
          provide: ProductorService,
          useValue: mockProductorService,
        },
      ],
    }).compile();

    productorController = app.get<ProductorController>(ProductorController);
  });

  it('should be defined', () => {
    expect(productorController).toBeDefined();
  });
  describe('getAllProductor', () => {
    it('should get all productor', async () => {
      //Arrange
      const mockProductor = [
        { id: 1, lastname: 'Speilberg', firstname: 'Steven', age: 66, now: true },
        { id: 2, lastname: 'Moi', firstname: 'Lui', age: 65, now: false }
      ];
      mockProductorService.getAll.mockReturnValue([mockProductor]);
      //Act
      const result = await productorController.getAllProductor()
      //Assert
      expect(result).toEqual([mockProductor]);
      expect(mockProductorService.getAll).toHaveBeenCalledWith()
    });
    it('should no productors found', async () => {
      //Arrange
      mockProductorService.getAll.mockReturnValue(null)
      //Act && Assert
      await expect(productorController.getAllProductor()).rejects.toThrow(Error);
      expect(mockProductorService.getAll).toHaveBeenCalledWith()
    })
  })
  describe('get', () => {
    it('should get a productor by id', async () => {
      //Arrange
      const mockProductor = { id: 1, lastname: 'Speilberg', firstname: 'Steven', age: 66, now: true };
      mockProductorService.get.mockReturnValue(mockProductor)
      //Act
      const result = await productorController.get(1)
      //Assert
      expect(result).toEqual(mockProductor);
      expect(mockProductorService.get).toHaveBeenCalledWith(1)
    })
    it('should no productor found', async () => {
      //Arrange
      mockProductorService.get.mockReturnValue(null)
      //Act && Assert
      await expect(productorController.get(0)).rejects.toThrow(Error);
      expect(mockProductorService.get).toHaveBeenCalledWith(0)
    })
  })
  describe('post', () => {
    it('should create a productor', async () => {
      //Arrange
      const mockProductor: ProductorDto = { lastname: 'Speilberg', firstname: 'Steven', age: 66, now: true };
      mockProductorService.post.mockReturnValue(mockProductor)
      //Act
      const result = await productorController.post({ productorDto: mockProductor })
      //Assert
      expect(result).toEqual(mockProductor);
      expect(mockProductorService.post).toHaveBeenCalledWith(mockProductor)
    })
  })
  describe('remove', () => {
    it('should', async () => {
      //Arrange
      mockProductorService.removeProductor.mockReturnValue(true)
      //Act
      const result = await productorController.remove(1);
      //Assert
      expect(result).toBeUndefined();
      expect(mockProductorService.removeProductor).toHaveBeenCalledWith(1)
    })
    it('should no productor found for delete', async () => {
      //Arrange
      mockProductorService.removeProductor.mockReturnValue(0);
      //Act && Assert
      await expect(productorController.remove(0)).rejects.toThrow(Error);
      expect(mockProductorService.removeProductor).toHaveBeenCalledWith(0)
    })
  })
});

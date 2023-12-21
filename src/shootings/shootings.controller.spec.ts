import { Test, TestingModule } from '@nestjs/testing';
import { ShootingsController } from './shootings.controller';
import { ShootingsService } from './shootings.service';

describe('ShootingsController', () => {
  let controller: ShootingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShootingsController],
      providers: [ShootingsService],
    }).compile();

    controller = module.get<ShootingsController>(ShootingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

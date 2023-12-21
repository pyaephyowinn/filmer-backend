import { Test, TestingModule } from '@nestjs/testing';
import { ShootingsService } from './shootings.service';

describe('ShootingsService', () => {
  let service: ShootingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShootingsService],
    }).compile();

    service = module.get<ShootingsService>(ShootingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

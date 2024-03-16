import { Test, TestingModule } from '@nestjs/testing';
import { WordsDalService } from './words.dal';

describe('WordsDalService', () => {
  let service: WordsDalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WordsDalService],
    }).compile();

    service = module.get<WordsDalService>(WordsDalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

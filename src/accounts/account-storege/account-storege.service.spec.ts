import { Test, TestingModule } from '@nestjs/testing';
import { AccountStoregeService } from './account-storege.service';

describe('AccountStoregeService', () => {
  let service: AccountStoregeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountStoregeService],
    }).compile();

    service = module.get<AccountStoregeService>(AccountStoregeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { BaseRepository } from './base.repository';
import { AccountModel } from '../models/account.model';
import { CategoryModel } from '../models/category.model';

export class AccountRepository extends BaseRepository<AccountModel>{
    protected endpoint: string = '/accounts';
    protected model = AccountModel;
}
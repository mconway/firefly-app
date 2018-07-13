import { BaseRepository } from './base.repository';
import { CategoryModel } from '../models/category.model';

export class CategoryRepository extends BaseRepository<CategoryModel>{
    protected endpoint: string = '/categories';
}
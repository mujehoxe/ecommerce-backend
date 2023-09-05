// src/categories/category.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dtos/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async getAll(): Promise<Category[]> {
    return this.categoryRepository.find({});
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const { name } = createCategoryDto;
    const category = this.categoryRepository.create({ name });
    return this.categoryRepository.save(category);
  }

  async findOrCreateCategory(categoryName: string): Promise<Category> {
    let category = await this.categoryRepository.findOne({
      where: { name: categoryName },
    });
    if (!category) {
      category = await this.create({ name: categoryName });
    }
    return category;
  }
}

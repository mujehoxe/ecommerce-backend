// src/categories/category.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity.js';
import { CreateCategoryDto } from './dtos/create-category.dto.js';

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

  async getById(id: number): Promise<Category> {
    return await this.categoryRepository.findOne({
      where: { id },
    });
  }

  async getByName(name: string): Promise<Category> {
    return this.categoryRepository.findOne({
      where: { name },
    });
  }

  async findOrCreateCategory(name: string): Promise<Category> {
    let category = await this.getByName(name);
    if (!category) {
      category = await this.create({ name: name });
    }
    return category;
  }
}

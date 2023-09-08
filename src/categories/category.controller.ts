// src/categories/category.controller.ts
import { Controller, Post, Body, Get } from '@nestjs/common';
import { CategoryService } from './category.service.js';
import { CreateCategoryDto } from './dtos/create-category.dto.js';
import { Category } from './category.entity.js';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAll(): Promise<Category[]> {
    return this.categoryService.getAll();
  }

  @Post()
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.create(createCategoryDto);
  }
}

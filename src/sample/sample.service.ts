import { EntityManager, type EntityRepository, type Loaded } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';

import type { SampleDto } from './sample.dto.js';
import { Category, Memo } from '../entities/test/index.js';

@Injectable()
export class SampleService {
  constructor(
    @InjectRepository(Memo) private memo: EntityRepository<Memo>,
    @InjectRepository(Category) private category: EntityRepository<Category>,
    private em: EntityManager,
  ) {}

  public async create(data: SampleDto): Promise<Memo> {
    const categories = data.categories ? await this.fetchCategories(data.categories) : [];
    const memo = this.memo.create({ ...data, categories });
    await this.em.flush();
    return memo;
  }

  public async read(id: number): Promise<Memo | null> {
    return this.memo.findOne({ id }, { populate: ['categories'] });
  }

  public async update(id: number, data: SampleDto): Promise<Memo> {
    const memo = await this.memo.findOneOrFail({ id }, { populate: ['categories'] });
    this.em.assign(memo, { title: data.title, content: data.content }, { ignoreUndefined: true });

    if (data.categories) {
      const categories = await this.fetchCategories(data.categories);
      for (const category of categories) {
        if (!memo.categories.contains(category)) {
          memo.categories.add(category);
        }
      }
    }

    await this.em.flush();
    return memo;
  }

  public async remove(id: number): Promise<number> {
    return this.memo.nativeDelete({ id });
  }

  private async fetchCategories(categories: string[]): Promise<Loaded<Category>[]> {
    return Promise.all(
      categories.map(async (name) => {
        const category = await this.category.findOne({ name });
        if (!category) {
          return this.category.create({ name });
        }

        return category;
      }),
    );
  }
}

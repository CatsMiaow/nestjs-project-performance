import { Collection, type Opt } from '@mikro-orm/core';
import { Entity, ManyToMany, PrimaryKey, Property } from '@mikro-orm/decorators/legacy';

import { Category } from './category.entity.js';

@Entity({ tableName: 'memo' })
export class Memo {
  @PrimaryKey()
  id!: number;

  @Property()
  title!: string;

  @Property({ nullable: true })
  content?: string;

  @ManyToMany(() => Category, 'memos', { owner: true, nullable: true })
  categories = new Collection<Category>(this);

  @Property({ type: 'datetime', columnType: 'timestamp', defaultRaw: `CURRENT_TIMESTAMP` })
  updatedAt!: Date & Opt;

  @Property({ type: 'datetime', columnType: 'timestamp', defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt!: Date & Opt;
}

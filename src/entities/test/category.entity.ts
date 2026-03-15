import { Collection, type Opt } from '@mikro-orm/core';
import { Entity, ManyToMany, PrimaryKey, Property } from '@mikro-orm/decorators/legacy';

import { Memo } from './memo.entity.js';

@Entity({ tableName: 'category' })
export class Category {
  @PrimaryKey()
  id!: number;

  @Property({ unique: true })
  name!: string;

  @ManyToMany(() => Memo, 'categories', { nullable: true })
  memos = new Collection<Memo>(this);

  @Property({ type: 'datetime', columnType: 'timestamp', defaultRaw: `CURRENT_TIMESTAMP` })
  updatedAt!: Date & Opt;

  @Property({ type: 'datetime', columnType: 'timestamp', defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt!: Date & Opt;
}

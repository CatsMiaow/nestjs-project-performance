import { Collection, Entity, ManyToMany, type Opt, PrimaryKey, Property } from '@mikro-orm/core';

import type { Memo } from './memo';

@Entity({ tableName: 'category' })
export class Category {
  @PrimaryKey()
  id!: number;

  @Property({ unique: true })
  name!: string;

  @ManyToMany('Memo', (memo: Memo) => memo.categories, { nullable: true })
  memos = new Collection<Memo>(this);

  @Property({ type: 'datetime', columnType: 'timestamp', defaultRaw: `CURRENT_TIMESTAMP` })
  updatedAt!: Date & Opt;

  @Property({ type: 'datetime', columnType: 'timestamp', defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt!: Date & Opt;
}

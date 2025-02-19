import { Collection, Entity, ManyToMany, type Opt, PrimaryKey, Property } from '@mikro-orm/core';

import { Category } from './category';

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

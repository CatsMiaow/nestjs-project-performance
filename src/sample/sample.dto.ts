import { Prisma } from '@prisma/client';
import { IsOptional, IsString, ArrayNotEmpty } from 'class-validator';

export class SampleDto implements Prisma.MemoCreateInput {
  @IsString()
  public title!: string;

  @IsOptional()
  @IsString()
  public content?: string;

  @IsOptional()
  @ArrayNotEmpty()
  public categories?: Prisma.CategoryCreateNestedManyWithoutMemoInput;
}

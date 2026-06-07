import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) {}

  // CREATE
  async create(dto: CreateProductDto): Promise<Product> {
    const product = this.productRepo.create(dto);
    return await this.productRepo.save(product);
  }

  // READ ALL
  async findAll(): Promise<Product[]> {
    return await this.productRepo.find();
  }

  // READ ONE
  async findOne(id: number): Promise<Product> {
    const product = await this.productRepo.findOne({ where: { id } });
    if (!product) throw new NotFoundException(`Produit #${id} introuvable`);
    return product;
  }

  // UPDATE
  async update(id: number, dto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);
    const updated = this.productRepo.merge(product, dto);
    return await this.productRepo.save(updated);
  }

  // DELETE
  async remove(id: number): Promise<{ message: string }> {
    const product = await this.findOne(id);
    await this.productRepo.remove(product);
    return { message: `Produit #${id} supprimé` };
  }
}
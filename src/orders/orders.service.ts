import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepo: Repository<Order>,
  ) {}

  // ─── CREATE ───────────────────────────────
  async create(dto: CreateOrderDto): Promise<Order> {
    const order = this.orderRepo.create(dto);
    return await this.orderRepo.save(order);
  }

  // ─── READ ALL ─────────────────────────────
  async findAll(): Promise<Order[]> {
    return await this.orderRepo.find();
  }

  // ─── READ ONE ─────────────────────────────
  async findOne(id: number): Promise<Order> {
    const order = await this.orderRepo.findOne({ where: { id } });
    if (!order) throw new NotFoundException(`Commande #${id} introuvable`);
    return order;
  }

  // ─── UPDATE ───────────────────────────────
  async update(id: number, dto: UpdateOrderDto): Promise<Order> {
    const order = await this.findOne(id);
    const updated = this.orderRepo.merge(order, dto);
    return await this.orderRepo.save(updated);
  }

  // ─── DELETE ───────────────────────────────
  async remove(id: number): Promise<{ message: string }> {
    const order = await this.findOne(id);
    await this.orderRepo.remove(order);
    return { message: `Commande #${id} supprimée` };
  }
}
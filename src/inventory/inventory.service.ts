import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { Inventory } from './entities/inventory.entity';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private inventoryRepo: Repository<Inventory>,
  ) {}

  // ─── CREATE ───────────────────────────────
  async create(dto: CreateInventoryDto): Promise<Inventory> {
    const inventory = this.inventoryRepo.create(dto);
    return await this.inventoryRepo.save(inventory);
  }

  // ─── READ ALL ─────────────────────────────
  async findAll(): Promise<Inventory[]> {
    return await this.inventoryRepo.find();
  }

  // ─── READ ONE ─────────────────────────────
  async findOne(id: number): Promise<Inventory> {
    const inventory = await this.inventoryRepo.findOne({ where: { id } });
    if (!inventory) throw new NotFoundException(`Inventaire #${id} introuvable`);
    return inventory;
  }

  // ─── UPDATE ───────────────────────────────
  async update(id: number, dto: UpdateInventoryDto): Promise<Inventory> {
    const inventory = await this.findOne(id);
    const updated = this.inventoryRepo.merge(inventory, dto);
    return await this.inventoryRepo.save(updated);
  }

  // ─── DELETE ───────────────────────────────
  async remove(id: number): Promise<{ message: string }> {
    const inventory = await this.findOne(id);
    await this.inventoryRepo.remove(inventory);
    return { message: `Inventaire #${id} supprimé` };
  }
}
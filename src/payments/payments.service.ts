import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepo: Repository<Payment>,
  ) {}

  // ─── CREATE ───────────────────────────────
  async create(dto: CreatePaymentDto): Promise<Payment> {
    const payment = this.paymentRepo.create(dto);
    return await this.paymentRepo.save(payment);
  }

  // ─── READ ALL ─────────────────────────────
  async findAll(): Promise<Payment[]> {
    return await this.paymentRepo.find();
  }

  // ─── READ ONE ─────────────────────────────
  async findOne(id: number): Promise<Payment> {
    const payment = await this.paymentRepo.findOne({ where: { id } });
    if (!payment) throw new NotFoundException(`Paiement #${id} introuvable`);
    return payment;
  }

  // ─── UPDATE ───────────────────────────────
  async update(id: number, dto: UpdatePaymentDto): Promise<Payment> {
    const payment = await this.findOne(id);
    const updated = this.paymentRepo.merge(payment, dto);
    return await this.paymentRepo.save(updated);
  }

  // ─── DELETE ───────────────────────────────
  async remove(id: number): Promise<{ message: string }> {
    const payment = await this.findOne(id);
    await this.paymentRepo.remove(payment);
    return { message: `Paiement #${id} supprimé` };
  }
}
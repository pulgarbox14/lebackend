import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async register(email: string, password: string) {
    const exists = await this.userRepository.findOne({ where: { email } });
    if (exists) throw new ConflictException('Email déjà utilisé');

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      email,
      password: hashedPassword,
    });

    const saved = await this.userRepository.save(user);

    const { password: _, ...result } = saved;
    return result;
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new UnauthorizedException('Email ou mot de passe incorrect');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Email ou mot de passe incorrect');

    const { password: _, ...result } = user;
    return { message: 'Connexion réussie', user: result };
  }
}
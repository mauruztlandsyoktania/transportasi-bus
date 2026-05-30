import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

type User = {
  id: number;
  name: string;
  email: string;
  password: string;
};

@Injectable()
export class AuthService {
  private users: User[] = [];
  private id = 1;

  constructor(private jwtService: JwtService) {}

  async register(dto: RegisterDto) {
    const hash = await bcrypt.hash(dto.password, 10);

    const user: User = {
      id: this.id++,
      name: dto.name,
      email: dto.email,
      password: hash,
    };

    this.users.push(user);

    return {
      message: 'Register success',
      user: { id: user.id, email: user.email, name: user.name },
    };
  }

  async login(dto: LoginDto) {
    const user = this.users.find((u) => u.email === dto.email);

    if (!user) {
      return { message: 'User not found' };
    }

    const valid = await bcrypt.compare(dto.password, user.password);

    if (!valid) {
      return { message: 'Wrong password' };
    }

    const token = this.jwtService.sign({
      id: user.id,
      email: user.email,
    });

    return {
      access_token: token,
    };
  }
}
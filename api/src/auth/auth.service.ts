import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
        private userService: UserService,
    ) {}

    async validadeUser(email: string, password: string) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) return null;

        const validation = await bcrypt.compare(password, user.password);
        if (!validation) return null;

        return user;
    }

    async login(email: string, password: string) {
        const user = await this.validadeUser(email, password);
        if (!user) throw new Error('Email e/ou Senha inválidos');

        const payload = { sub: user.id, email: user.email };
        return {
            access_token: this.jwtService.sign(payload),
            user: { id: user.id, name: user.name, email: user.email },
        };
    }

    async register(name: string, email: string, password: string) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.userService.createUser(name, email, hashedPassword);

        const payload = { sub: user.id, email: user.email };
        return {
            access_token: this.jwtService.sign(payload),
            user: { id: user.id, name: user.name, email: user.email },
        };
    };
}

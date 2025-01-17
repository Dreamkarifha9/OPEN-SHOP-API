import { ConflictException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prismaService/prisma.service';
import { UsersService } from 'src/users/users.service';
import { SignupRequestDto } from './dto/signup.request.dto';
import * as uuid from 'uuid';
import { LoginRequest } from './dto/login.request.dto';
import { JwtPayload } from './jwt-payload';
import { JwtService } from '@nestjs/jwt';
import { AuthUser } from './auth-user';
@Injectable()
export class AuthService {

    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,

    ) { }
    async signup(signupRequest: SignupRequestDto): Promise<void> {
        console.log(signupRequest);

        try {
            const salt = await bcrypt.genSalt(10);
            console.log('salt', salt)
            await this.prisma.users.create({
                data: {
                    user_name: signupRequest.user_name.toLowerCase(),
                    email: signupRequest.email.toLowerCase(),
                    password: await bcrypt.hash(signupRequest.password, salt),
                    first_name: signupRequest.first_name,
                    last_name: signupRequest.last_name,
                    salt: salt,
                    created_by: signupRequest.created_by,
                    created_at: signupRequest.created_at,
                    updated_at: signupRequest.updated_at,
                    updated_by: signupRequest.updated_by,
                    id: uuid.v6(),
                },
                select: null,
            });
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2002') {
                    // unique constraint
                    throw new ConflictException();
                } else throw e;
            } else throw e;
        }

    }
    async validateUser(payload: JwtPayload): Promise<AuthUser> {
        const user = await this.prisma.users.findUnique({
            where: { id: payload.id },
            select: { id: true, email: true, user_name: true, first_name: true, last_name: true }
        });
        Logger.log(`displaying user ${JSON.stringify(user)}`);
        if (
            user !== null &&
            user.email === payload.email &&
            user.user_name === payload.username
        ) {
            return user;
        }
        throw new UnauthorizedException();
    }
    async login(loginRequest: LoginRequest): Promise<string> {
        const normalizedIdentifier = loginRequest.identifier.toLowerCase();
        const user = await this.prisma.users.findFirst({
            where: {
                OR: [
                    {
                        user_name: normalizedIdentifier,
                    },
                    {
                        email: normalizedIdentifier,
                    },
                ],
            },
            select: {
                id: true,
                password: true,
                email: true,
                user_name: true,
            },
        });

        if (
            user === null ||
            !bcrypt.compareSync(loginRequest.password, user.password)
        ) {
            throw new UnauthorizedException();
        }

        const payload: JwtPayload = {
            id: user.id,
            email: user.email,
            username: user.user_name,
        };

        return this.jwtService.signAsync(payload);
    }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
    CreateUserDto,
    MailboxEntity,
    MajorEntity,
    UpdateUserDto,
    User,
    UserEntity,
} from '../types';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(MailboxEntity)
        private readonly mailboxRepository: Repository<MailboxEntity>,
        @InjectRepository(MajorEntity)
        private readonly majorRepository: Repository<MajorEntity>,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        // create user
        const newUser = this.userRepository.create(createUserDto);
        // hash password
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(newUser.password, salt);
        // create mailbox
        const newMailbox = this.mailboxRepository.create(new MailboxEntity());
        await this.mailboxRepository.save(newMailbox);
        newUser.mail = newMailbox;
        // create major
        const addMajors = [];
        for (const createMajorDto of createUserDto.majors) {
            const majors = await this.majorRepository
                .createQueryBuilder('major')
                .where('major.id = :id', { id: createMajorDto.Id })
                .getOne();

            if (!majors) {
                const newMajor = this.majorRepository.create(createMajorDto);
                const savedMajor = await this.majorRepository.save(newMajor);
                addMajors.push(savedMajor);
            }

            addMajors.push(majors);
        }
        newUser.majors = addMajors;
        // summary
        return await this.userRepository.save(newUser);
    }

    async findOneUser(id: string): Promise<User> {
        const user = await this.userRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.mail', 'mail')
            .where('user.id = :id', { id })
            .getOne();

        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    async findOneUserByUsername(username: string): Promise<User> {
        const user = await this.userRepository
            .createQueryBuilder('user')
            .where('user.username = :username', { username })
            .getOne();

        if (!user) {
            throw new NotFoundException(`User with ID ${username} not found`);
        }

        return user;
    }

    async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.userRepository
            .createQueryBuilder('user')
            .where('user.id = :id', { id })
            .getOne();

        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        await this.userRepository.update(id, updateUserDto);

        return this.findOneUserByUsername(id);
    }

    async deleteUser(id: string): Promise<void> {
        const user = await this.userRepository
            .createQueryBuilder('user')
            .where('user.id = :id', { id })
            .getOne();

        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        user.isBaned = true;
        await this.userRepository.save(user);
    }

    async saveRefreshToken(refreshToken: string, id: string): Promise<string> {
        const user = await this.userRepository
            .createQueryBuilder('user')
            .where('user.id = :id', { id })
            .getOne();

        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        const updateUser = new UpdateUserDto();
        updateUser.refresh_token = refreshToken;

        await this.userRepository.update(id, updateUser);

        return refreshToken;
    }
}

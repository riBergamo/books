import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/PrismaService';
import { BookDTO } from './book.dto';

@Injectable()
export class BookService {

    constructor(private prisma: PrismaService) {
    }

    async create(data: BookDTO) {

        //busque o 1 livro({ onde: { meu barcode seja igual ao barcode no bd } )}
        const bookExists = await this.prisma.book.findFirst({
            where: {
                bar_code: data.bar_code,
            },
        });

        if(bookExists) {
            throw new Error('Book already exists');
        }

        const book = await this.prisma.book.create({//await : aguarda construçao do book
            data,
        });

        return book;
    }

    async findAll() {
        return this.prisma.book.findMany();
    }

    async findOne(id: string, data: BookDTO) {

        const bookExists = await this.prisma.book.findUnique({
            where: {
                id,
            },
        });

        if(bookExists) {
            return this.prisma.book.findUnique({
                where: {
                    id,
                },
            });
        }

        return this.prisma.book.findMany();
    }

    async update(id: string, data: BookDTO) {

        const bookExists = await this.prisma.book.findUnique({
            where: {
                id,
            },
        });

        if(!bookExists) {
            throw new Error('Book does not exists!');
        };

        return await this.prisma.book.update({//retornar o id onde o id colocado seja igual ao meu id
            data,
            where: {
                id,
            },
        });
    };

    async delete(id: string, data: BookDTO) {

        const bookExists = await this.prisma.book.findUnique({
            where: {
                id,
            },
        });

        if(!bookExists) {
            throw new Error('Book does not exists!');
        };

        return await this.prisma.book.delete({
            where: {
                id,
            },
        });

    }
}

import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BookDTO } from './book.dto';
import { BookService } from './book.service';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  async create(@Body() data: BookDTO) {
    return this.bookService.create(data);
  }

  @Get()
  async findAll() {
    return this.bookService.findAll();
  }

  @Get(':id')
  async findOne(@Param("id") id: string, @Body() data: BookDTO) {
    return this.bookService.findOne(id, data);
  }

  @Put(':id')
  async update(@Param("id") id: string, @Body() data: BookDTO) {
    return this.bookService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param("id") id: string, @Body() data: BookDTO) {
    return this.bookService.delete(id, data);
  }

}

//http://localhost:3000/book

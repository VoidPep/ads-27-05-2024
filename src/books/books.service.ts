import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBookDto  } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './schemas/book.schema';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const createdBook = new this.bookModel(createBookDto);
    return createdBook.save();
  }

  async findAll(): Promise<Book[]> {
    return this.bookModel.find();
  }

  async findOne(id: number) {
    const book = this.bookModel.findById(id)

    return book;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    const updatedBook = this.bookModel.findByIdAndUpdate(id, updateBookDto)
    
    return updatedBook;
  }
  
  remove(id: number) {
    const removedBook = this.bookModel.findByIdAndDelete(id)
    
    return removedBook;
  }
}

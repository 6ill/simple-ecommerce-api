import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto, UpdateProductDto } from 'src/common/dtos';
import { Product } from 'src/database/entities';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productsRepository: Repository<Product>
    ) {}

    async create(createProductDto: CreateProductDto): Promise<Product> {
        const product = this.productsRepository.create(createProductDto);
        return await this.productsRepository.save(product);
    }

    async getAll(): Promise<Product[]> {
        return await this.productsRepository.find();
    }

    async getById(id: string): Promise<Product> {
        return await this.productsRepository.findOne({
            where: {id}
        });
    }

    async update(id: string, updateProductDto: UpdateProductDto): Promise<UpdateResult> {
        const updateResult = await this.productsRepository.update({id}, updateProductDto);
        return updateResult;
    }

    async delete(id: string): Promise<DeleteResult> {
        const deleteResult = await this.productsRepository.delete({id});
        return deleteResult;
    }
}

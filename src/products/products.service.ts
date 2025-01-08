import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto, ProductsQueryDto, UpdateProductDto } from 'src/common/dtos';
import { Product } from 'src/database/entities';
import { Between, DeleteResult, ILike, Repository, UpdateResult } from 'typeorm';

const MAX_INT_SQL = 2**31-1

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

    private extractSortOption(sort?: string): Record<string, string> {
        if(!sort) return {}
        let sortMethod = 'ASC'
        let columnName = String(sort)
        if(sort.startsWith("-", 0)) {
            sortMethod = 'DESC'
            columnName = sort.slice(1)
        }
        if( columnName === 'price') {
            return {price: sortMethod}
        }
        return {}
    }

    async getAll(queryDto: ProductsQueryDto): Promise<Product[]> {
        const lowestPrice = queryDto.lowestPrice ?? 0;
        const highestPrice = queryDto.highestPrice ? Math.min(queryDto.highestPrice, MAX_INT_SQL) : MAX_INT_SQL;
        return await this.productsRepository.find({
            where: {
                name: ILike(`%${queryDto.name ?? ''}%`),
                price: Between(lowestPrice, highestPrice)
            },
            order: this.extractSortOption(queryDto.sort),
        });
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

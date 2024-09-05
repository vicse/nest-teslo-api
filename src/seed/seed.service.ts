import { Injectable } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { initialData } from './data/seed-data';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedService {
  constructor(
    private readonly productsService: ProductsService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async runSeed() {
    await this.deleteTables();
    const adminUser = await this.insertUsers();
    await this.insertNewProducts(adminUser);
    return 'SEED EXECUTED';
  }

  private async deleteTables() {
    await this.productsService.deleteAllProducts();
    const queryBuilder = this.userRepository.createQueryBuilder();
    await queryBuilder.delete().where({}).execute();
  }

  private async insertUsers() {
    const seedUsers = initialData.users;
    const mapUsers = seedUsers.map(({ password, ...seedUser }) => {
      return {
        password: bcrypt.hashSync(password, 10),
        ...seedUser,
      };
    });
    const dbUsers = await this.userRepository.save(mapUsers);
    return dbUsers[0];
  }

  private async insertNewProducts(user: User) {
    const products = initialData.products;

    const insertPromises = products.map(async (product) => {
      await this.productsService.create(product, user);
    });

    await Promise.all(insertPromises);
  }
}

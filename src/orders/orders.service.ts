import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { EmptyResultError } from 'sequelize';
import { AccountStorageService } from 'src/accounts/account-storege/account-storege.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {

  constructor(
    @InjectModel(Order)
    private orderModule: typeof Order,
    private accountStorege : AccountStorageService,
  ){}

  create(createOrderDto: CreateOrderDto) {
    return this.orderModule.create({
      ...createOrderDto,
      account_id : this.accountStorege.account.id,
    })
  }

  findAll() {
    return this.orderModule.findAll({
      where : {
        account_id: this.accountStorege.account.id,
      }
    })
  }

  findOne(id: string) {
    return this.orderModule.findOne({
      where : {
        id,
        account_id : this.accountStorege.account.id
      },
      rejectOnEmpty : new EmptyResultError(`id : ${id} not found`)
    })
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const order = await this.findOne(id);
    return order.update(updateOrderDto);
  }

  async remove(id: string) {
    const order = await this.findOne(id);
    return order.destroy();
  }
}

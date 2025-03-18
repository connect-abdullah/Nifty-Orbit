import { Injectable } from '@nestjs/common';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { UpdateShipmentDto } from './dto/update-shipment.dto';
import { Shipment } from './entities/shipment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class ShipmentService {
  constructor(
   @InjectRepository(Shipment)
         private readonly ShipmentRepository: Repository<Shipment>) {}



 async create(createShipmentDto: CreateShipmentDto) {
    const Shipment = await this.ShipmentRepository.create(createShipmentDto)
    return this.ShipmentRepository.save(Shipment);
  }

  findAll() {
    return `This action returns all shipment`;
  }

  async findByEmail(email: any) {
    // const{name} = email;
    // const user = await this.ShipmentRepository.findOne({where :{ user : { first_name : ILike (name)}}, relations: { user: true}})
   const user =  await this.ShipmentRepository.findOne({ where: { user: { email: email.name } } });
    if(user){
  return user;
}
 return 'User Not Found';
  }

  update(id: number, updateShipmentDto: UpdateShipmentDto) {
    return `This action updates a #${id} shipment`;
  }

  remove(id: number) {
    return `This action removes a #${id} shipment`;
  }
}

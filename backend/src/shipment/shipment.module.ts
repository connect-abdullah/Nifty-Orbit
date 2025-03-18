import { Module } from '@nestjs/common';
import { ShipmentService } from './shipment.service';
import { ShipmentController } from './shipment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shipment } from './entities/shipment.entity';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [UsersModule,TypeOrmModule.forFeature([Shipment, User])],
  controllers: [ShipmentController],
  providers: [ShipmentService],
  exports: [ShipmentService]
})
export class ShipmentModule {}

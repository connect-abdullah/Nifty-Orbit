import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Payment, User])],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports:[ PaymentService]
})
export class PaymentModule {}

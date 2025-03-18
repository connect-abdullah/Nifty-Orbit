import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ShipmentService } from 'src/shipment/shipment.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService,
    private readonly ShipmentService: ShipmentService
  ) {}

  @Post()
 async createOrder(@Body() createOrderDto: any) {
  //const{ email} = createOrderDto;
   // console.log(email);
    const shipment = this.ordersService.checkout(createOrderDto);
    console.log(shipment)
    return shipment;
  }

  @Post('place-order')
async placeOrder(@Body() body: { user_id: number }) {
  return this.ordersService.placeOrderWithCart(body.user_id);
}
 
}

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { Shipment } from 'src/shipment/entities/shipment.entity';
import { Order } from './entities/order.entity';
import { OrderItem } from 'src/order_item/entities/order_item.entity';
import { Product } from 'src/products/entities/product.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { console } from 'inspector';
import { last } from 'rxjs';
import { Payment } from 'src/payment/entities/payment.entity';
import { CartItem } from 'src/cart-items/entities/cart-item.entity';

@Injectable()
export class OrdersService {
  constructor(
   @InjectRepository(User)
       private readonly UserRepository: Repository<User>,
       @InjectRepository(Shipment)
       private readonly ShipmentRepository: Repository<Shipment>,
       @InjectRepository(Order)
       private readonly OrderRepository: Repository<Order>,
       @InjectRepository(OrderItem)
       private readonly OrderItemRepository: Repository<OrderItem>,
       @InjectRepository(Product)
       private readonly ProductRepository: Repository<Product>,
       @InjectRepository(Cart)
       private readonly CartRepository: Repository<Cart>,
       @InjectRepository(Payment)
       private readonly PaymentRepository: Repository<Payment>,
       @InjectRepository(CartItem)
       private readonly CartItemRepository: Repository<CartItem>
       

       
  ){}
  
  async checkout(checkoutDto: any){
    const { email, cartItems, shippingAddress, paymentDetails } = checkoutDto;

    //Fetch User with email
    const user = await this.UserRepository.findBy({email});
    if(!user){
      const user = this.UserRepository.create({
        first_name : checkoutDto.first_name,
        last_name : checkoutDto.last_name,
        email : email,})
        await this.UserRepository.save(user);
    }
  // Step 1: Check if user already has a saved address in shipment table
  let shipment = await this.ShipmentRepository.findOne({ where: { user: { email: email } } });

  if (!shipment) {
    // Step 2: If no existing address, create a new shipment entry
    shipment = this.ShipmentRepository.create({
      address: shippingAddress.address,
      city: shippingAddress.city,
      state: shippingAddress.state,
      company: shippingAddress.company,
      user: { email: email, first_name : checkoutDto.first_name, last_name: checkoutDto.last_name }, // Many-to-One relation
      shipment_date: new Date(),
    });
    await this.ShipmentRepository.save(shipment);
  }

  // Step 3: Create an order in orders table
  const order = this.OrderRepository.create({
    user: { user_id: checkoutDto.customerId }, // Many-to-One relation
    order_date: new Date(),
    total_price: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    shipment: shipment, // Linking shipment_id
  });
  await this.OrderRepository.save(order);

  // Step 4: Insert order items into order_item table
  for (const item of cartItems) {
    const orderItem = this.OrderItemRepository.create({
      order: order, // Linking order_id
      product: { product_id: item.product_id }, // Many-to-One relation
      quantity: item.quantity,
      price: item.price,
    });
    await this.OrderItemRepository.save(orderItem);
  }

  // Step 5: Process payment and insert into payment table
  const payment = this.PaymentRepository.create({
    user: { user_id: checkoutDto.customerId }, // Many-to-One relation
    payment_method: paymentDetails.method,
    amount: order.total_price,
    order :{order_id: order.order_id}
  });
  await this.PaymentRepository.save(payment);

  return { message: 'Order placed successfully!', orderId: order.order_id };
}
// async checkout(checkout: any){
//   const { email} = checkout;
//   console.log(checkout);
//   // const { email } = checkout;
//   // console.log(email);
//   let user = await this.UserRepository.findOne({where: {email}});
//   let shipment = await this.ShipmentRepository.findBy({user: { user_id : user?.user_id}})

// //console.log(shipment);
//     return [ shipment , user];
// }

async placeOrderWithCart(user_id: number) {
  // Fetch user cart with cart items
  const cart = await this.CartRepository.findOne({
    where: { user: { user_id: user_id } },
    relations: ['cartItems', 'cartItems.product'],
  });

  if (!cart || cart.cartItems.length === 0) {
    throw new NotFoundException('Cart is empty. Cannot place order.');
  }

  // Create a new order
  const order = this.OrderRepository.create({
    user: { user_id: user_id },
    orderItems: [],
  });
  await this.OrderRepository.save(order);

  // Transfer cart items to order items
  for (const cartItem of cart.cartItems) {
    const orderItem = this.OrderItemRepository.create({
      order: order,
      product: cartItem.product,
      quantity: cartItem.quantity,
    });
    await this.OrderItemRepository.save(orderItem);
  }

  // Clear the user's cart after placing the order
  await this.CartItemRepository.delete({ cart: { cart_id: cart.cart_id } });

  return { message: 'Order placed successfully', order };
}
}

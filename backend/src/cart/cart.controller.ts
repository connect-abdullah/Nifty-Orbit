import { Controller, Get, Post, Body, Patch, Param, Delete, Request, ParseIntPipe } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  // @Post('add')
  // async addToCart(@Request() req, @Body() addToCartDto: CreateCartDto) {
  //   return await this.cartService.addToCart(req.user.id, addToCartDto);
  // }
  @Post('add')
  async addToCart(@Body() addToCartDto: CreateCartDto) {
    const user_id = 2;
    return await this.cartService.addToCart(user_id, addToCartDto);
  }
   
  @Get(':user_id')
  async getCart(@Param('user_id', ParseIntPipe) user_id: number) {
    return this.cartService.getUserCart(user_id);
  }
}

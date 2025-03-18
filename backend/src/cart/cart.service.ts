import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CartItem } from 'src/cart-items/entities/cart-item.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private cartRepository: Repository<Cart>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(CartItem) private CartItem: Repository<CartItem>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async addToCart(user_id: number, addToCartDto: CreateCartDto) {
    const{ product_id, quantity} = addToCartDto;
    const product = await this.productRepository.findOne({ where: { product_id: product_id } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
  
    // Find or create cart for the user
    let cart = await this.cartRepository.findOne({
      where: { user: { user_id: user_id } },
      relations: ['cartItems'],
    });
  
    if (!cart) {
      cart = this.cartRepository.create({ user: { user_id: user_id }, cartItems: [] });
      cart = await this.cartRepository.save(cart);
    }
  
    // Check if product is already in cart
    const existingCartItem = cart.cartItems.find(item => item.product.product_id === product_id);
  
    if (existingCartItem) {
      existingCartItem.quantity += quantity; // Update quantity
      await this.CartItem.save(existingCartItem);
    } else {
      const newCartItem = this.CartItem.create({
        cart: cart,
        product: product,
        quantity: quantity,
      });
      await this.CartItem.save(newCartItem);
    }
  
    return this.getUserCart(user_id); // Return updated cart
  }

  async getUserCart(user_id: number) {
    const cart = await this.cartRepository.findOne({
      where: { user: { user_id: user_id } }, 
      relations: ['cartItems', 'cartItems.product'], 
    });
  
    if (!cart) {
      throw new NotFoundException('Cart not found for user');
    }
  
    return cart;
  }

 
  
}

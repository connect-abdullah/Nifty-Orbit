import { Cart } from "src/cart/entities/cart.entity";
import { Product } from "src/products/entities/product.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  cart_item_id: number;

  @ManyToOne(() => Cart, (cart) => cart.cartItems, { onDelete: "CASCADE" })
  @JoinColumn({ name: "cart_id" })
  cart: Cart;

  @ManyToOne(() => Product, { eager: true }) 
  @JoinColumn({ name: "product_id" }) 
  product: Product;

  @Column()
  quantity: number;
}
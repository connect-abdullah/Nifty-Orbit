import Cookies from 'js-cookie';

export const getCartItems = () => {
  const cartItems = Cookies.get('cartItems');
  return cartItems ? JSON.parse(cartItems) : [];
};

// Modified addToCart function with debugging
export const addToCart = (product) => {
  console.log('Adding product:', product); // Debug log
  const currentCart = getCartItems();
  console.log('Current cart before adding:', currentCart); // Debug log
  
  const existingProductIndex = currentCart.findIndex(item => item.id === product.id);
  
  if (existingProductIndex !== -1) {
    currentCart[existingProductIndex].quantity += 1;
    console.log('Increased quantity for existing product');
  } else {
    currentCart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
      quantity: 1
    });
    console.log('Added new product to cart');
  }
  
  Cookies.set('cartItems', JSON.stringify(currentCart), { expires: 7 });
  console.log('Updated cart:', currentCart); // Debug log
  return currentCart;
};

export const proceedToCheckout = (navigate) => {
  const cartItems = getCartItems();
  const total = getCartTotal();
  
  if (cartItems.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  
  navigate('/payment', { 
    state: { 
      isFullCart: true,
      cartItems: cartItems,
      totalAmount: total
    }
  });
  
  return { cartItems, totalAmount: total };
};

export const removeFromCart = (productId) => {
  const currentCart = getCartItems();
  const updatedCart = currentCart.filter(item => item.id !== productId);
  Cookies.set('cartItems', JSON.stringify(updatedCart), { expires: 7 });
  return updatedCart;
};

// Add these new functions

export const updateCartItemQuantity = (productId, quantity) => {
  const currentCart = getCartItems();
  const updatedCart = currentCart.map(item => 
    item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
  );
  Cookies.set('cartItems', JSON.stringify(updatedCart), { expires: 7 });
  return updatedCart;
};

export const clearCart = () => {
  Cookies.remove('cartItems');
  return [];
};

export const getCartTotal = () => {
  const cartItems = getCartItems();
  return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
};

export const getCartItemCount = () => {
  const cartItems = getCartItems();
  return cartItems.reduce((total, item) => total + item.quantity, 0);
};

export const debugCart = () => {
  const cart = getCartItems();
  console.log('Current Cart Contents:', cart);
  cart.forEach(item => {
    console.log(`Product ID: ${item.id}, Name: ${item.name}, Quantity: ${item.quantity}`);
  });
  console.log('Total Items:', getCartItemCount());
  console.log('Total Value: $', getCartTotal());
};

export const updateCartItem = (productId, updates) => {
  const currentCart = getCartItems();
  const updatedCart = currentCart.map(item => 
    item.id === productId ? { ...item, ...updates } : item
  );
  Cookies.set('cartItems', JSON.stringify(updatedCart), { expires: 7 });
  return updatedCart;
};

export const isItemInCart = (productId) => {
  const currentCart = getCartItems();
  return currentCart.some(item => item.id === productId);
};
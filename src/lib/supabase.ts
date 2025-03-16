import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Products
export async function getProducts(options: {
  category?: string;
  subcategory?: string;
  featured?: boolean;
  trending?: boolean;
  newArrival?: boolean;
  search?: string;
  limit?: number;
  offset?: number;
}) {
  let query = supabase.from('products').select('*');

  if (options.category) {
    query = query.eq('category', options.category);
  }
  if (options.subcategory) {
    query = query.eq('subcategory', options.subcategory);
  }
  if (options.featured) {
    query = query.eq('featured', true);
  }
  if (options.trending) {
    query = query.eq('trending', true);
  }
  if (options.newArrival) {
    query = query.eq('new_arrival', true);
  }
  if (options.search) {
    query = query.textSearch('search_vector', options.search);
  }
  if (options.limit) {
    query = query.limit(options.limit);
  }
  if (options.offset) {
    query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
  }

  return query.order('created_at', { ascending: false });
}

export async function getProductBySlug(slug: string) {
  return supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single();
}

// Categories
export async function getCategories() {
  return supabase
    .from('categories')
    .select('*, subcategories(*)');
}

export async function getCategoryBySlug(slug: string) {
  return supabase
    .from('categories')
    .select('*, subcategories(*)')
    .eq('slug', slug)
    .single();
}

// Orders
export async function createOrder(order: {
  total_amount: number;
  shipping_address: any;
  payment_method: string;
  items: Array<{
    product_id: string;
    quantity: number;
    size: string;
    color: string;
    price_at_time: number;
  }>;
}) {
  const { data: user } = await supabase.auth.getUser();
  if (!user.user) throw new Error('User not authenticated');

  const { data: orderData, error: orderError } = await supabase
    .from('orders')
    .insert({
      user_id: user.user.id,
      total_amount: order.total_amount,
      shipping_address: order.shipping_address,
      payment_method: order.payment_method
    })
    .select()
    .single();

  if (orderError) throw orderError;

  const orderItems = order.items.map(item => ({
    order_id: orderData.id,
    ...item
  }));

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems);

  if (itemsError) throw itemsError;

  return orderData;
}

export async function getUserOrders() {
  const { data: user } = await supabase.auth.getUser();
  if (!user.user) throw new Error('User not authenticated');

  return supabase
    .from('orders')
    .select(`
      *,
      order_items (
        *,
        product:products (*)
      )
    `)
    .eq('user_id', user.user.id)
    .order('created_at', { ascending: false });
}

// Reviews
export async function createReview(review: {
  product_id: string;
  rating: number;
  comment?: string;
}) {
  const { data: user } = await supabase.auth.getUser();
  if (!user.user) throw new Error('User not authenticated');

  // Check if user has purchased the product
  const { data: orders } = await supabase
    .from('order_items')
    .select('order_id')
    .eq('product_id', review.product_id)
    .eq('orders.user_id', user.user.id)
    .limit(1);

  const verifiedPurchase = orders && orders.length > 0;

  return supabase
    .from('reviews')
    .insert({
      user_id: user.user.id,
      product_id: review.product_id,
      rating: review.rating,
      comment: review.comment,
      verified_purchase: verifiedPurchase
    });
}

export async function getProductReviews(productId: string) {
  return supabase
    .from('reviews')
    .select(`
      *,
      user:auth.users (
        id,
        email,
        raw_user_meta_data->display_name
      )
    `)
    .eq('product_id', productId)
    .order('created_at', { ascending: false });
}
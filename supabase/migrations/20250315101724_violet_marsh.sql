/*
  # Initial Schema Setup for E-commerce Platform

  1. New Tables
    - products
      - id (uuid, primary key)
      - name (text)
      - description (text)
      - price (numeric)
      - discount_price (numeric, nullable)
      - category (text)
      - subcategory (text)
      - images (text[])
      - sizes (text[])
      - colors (text[])
      - material (text)
      - in_stock (boolean)
      - featured (boolean)
      - trending (boolean)
      - new_arrival (boolean)
      - ratings (numeric)
      - review_count (integer)
      - created_at (timestamp)
      - slug (text)

    - orders
      - id (uuid, primary key)
      - user_id (uuid, references auth.users)
      - total_amount (numeric)
      - status (text)
      - shipping_address (jsonb)
      - payment_method (text)
      - created_at (timestamp)

    - order_items
      - id (uuid, primary key)
      - order_id (uuid, references orders)
      - product_id (uuid, references products)
      - quantity (integer)
      - size (text)
      - color (text)
      - price_at_time (numeric)
      - created_at (timestamp)

    - reviews
      - id (uuid, primary key)
      - product_id (uuid, references products)
      - user_id (uuid, references auth.users)
      - rating (integer)
      - comment (text)
      - verified_purchase (boolean)
      - created_at (timestamp)

    - categories
      - id (uuid, primary key)
      - name (text)
      - slug (text)
      - description (text)
      - image (text)
      - created_at (timestamp)

    - subcategories
      - id (uuid, primary key)
      - category_id (uuid, references categories)
      - name (text)
      - slug (text)
      - created_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Add policies for public read access where appropriate

  3. Indexes
    - Add indexes for frequently queried columns
    - Add unique constraints where needed
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Products Table
CREATE TABLE IF NOT EXISTS products (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name text NOT NULL,
    description text,
    price numeric NOT NULL CHECK (price >= 0),
    discount_price numeric CHECK (discount_price >= 0),
    category text NOT NULL,
    subcategory text,
    images text[] NOT NULL,
    sizes text[] NOT NULL,
    colors text[] NOT NULL,
    material text,
    in_stock boolean DEFAULT true,
    featured boolean DEFAULT false,
    trending boolean DEFAULT false,
    new_arrival boolean DEFAULT false,
    ratings numeric DEFAULT 0 CHECK (ratings >= 0 AND ratings <= 5),
    review_count integer DEFAULT 0,
    created_at timestamptz DEFAULT now(),
    slug text UNIQUE,
    search_vector tsvector GENERATED ALWAYS AS (
        setweight(to_tsvector('english', coalesce(name, '')), 'A') ||
        setweight(to_tsvector('english', coalesce(description, '')), 'B') ||
        setweight(to_tsvector('english', coalesce(category, '')), 'C')
    ) STORED
);

-- Categories Table
CREATE TABLE IF NOT EXISTS categories (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name text NOT NULL,
    slug text UNIQUE NOT NULL,
    description text,
    image text,
    created_at timestamptz DEFAULT now()
);

-- Subcategories Table
CREATE TABLE IF NOT EXISTS subcategories (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id uuid REFERENCES categories(id) ON DELETE CASCADE,
    name text NOT NULL,
    slug text UNIQUE NOT NULL,
    created_at timestamptz DEFAULT now()
);

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    total_amount numeric NOT NULL CHECK (total_amount >= 0),
    status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
    shipping_address jsonb NOT NULL,
    payment_method text NOT NULL,
    created_at timestamptz DEFAULT now()
);

-- Order Items Table
CREATE TABLE IF NOT EXISTS order_items (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id uuid REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
    product_id uuid REFERENCES products(id) ON DELETE SET NULL,
    quantity integer NOT NULL CHECK (quantity > 0),
    size text NOT NULL,
    color text NOT NULL,
    price_at_time numeric NOT NULL CHECK (price_at_time >= 0),
    created_at timestamptz DEFAULT now()
);

-- Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id uuid REFERENCES products(id) ON DELETE CASCADE NOT NULL,
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment text,
    verified_purchase boolean DEFAULT false,
    created_at timestamptz DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS products_category_idx ON products(category);
CREATE INDEX IF NOT EXISTS products_search_vector_idx ON products USING gin(search_vector);
CREATE INDEX IF NOT EXISTS orders_user_id_idx ON orders(user_id);
CREATE INDEX IF NOT EXISTS order_items_order_id_idx ON order_items(order_id);
CREATE INDEX IF NOT EXISTS reviews_product_id_idx ON reviews(product_id);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE subcategories ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Policies for products
CREATE POLICY "Products are viewable by everyone" ON products
    FOR SELECT USING (true);

CREATE POLICY "Products are insertable by authenticated users with admin role" ON products
    FOR INSERT TO authenticated
    WITH CHECK (EXISTS (
        SELECT 1 FROM auth.users
        WHERE auth.users.id = auth.uid()
        AND auth.users.raw_user_meta_data->>'role' = 'admin'
    ));

CREATE POLICY "Products are updatable by authenticated users with admin role" ON products
    FOR UPDATE TO authenticated
    USING (EXISTS (
        SELECT 1 FROM auth.users
        WHERE auth.users.id = auth.uid()
        AND auth.users.raw_user_meta_data->>'role' = 'admin'
    ));

CREATE POLICY "Products are deletable by authenticated users with admin role" ON products
    FOR DELETE TO authenticated
    USING (EXISTS (
        SELECT 1 FROM auth.users
        WHERE auth.users.id = auth.uid()
        AND auth.users.raw_user_meta_data->>'role' = 'admin'
    ));

-- Policies for categories
CREATE POLICY "Categories are viewable by everyone" ON categories
    FOR SELECT USING (true);

CREATE POLICY "Categories are insertable by authenticated users with admin role" ON categories
    FOR INSERT TO authenticated
    WITH CHECK (EXISTS (
        SELECT 1 FROM auth.users
        WHERE auth.users.id = auth.uid()
        AND auth.users.raw_user_meta_data->>'role' = 'admin'
    ));

-- Policies for subcategories
CREATE POLICY "Subcategories are viewable by everyone" ON subcategories
    FOR SELECT USING (true);

CREATE POLICY "Subcategories are insertable by authenticated users with admin role" ON subcategories
    FOR INSERT TO authenticated
    WITH CHECK (EXISTS (
        SELECT 1 FROM auth.users
        WHERE auth.users.id = auth.uid()
        AND auth.users.raw_user_meta_data->>'role' = 'admin'
    ));

-- Policies for orders
CREATE POLICY "Users can view their own orders" ON orders
    FOR SELECT TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own orders" ON orders
    FOR INSERT TO authenticated
    WITH CHECK (auth.uid() = user_id);

-- Policies for order items
CREATE POLICY "Users can view their own order items" ON order_items
    FOR SELECT TO authenticated
    USING (EXISTS (
        SELECT 1 FROM orders
        WHERE orders.id = order_items.order_id
        AND orders.user_id = auth.uid()
    ));

CREATE POLICY "Users can create their own order items" ON order_items
    FOR INSERT TO authenticated
    WITH CHECK (EXISTS (
        SELECT 1 FROM orders
        WHERE orders.id = order_items.order_id
        AND orders.user_id = auth.uid()
    ));

-- Policies for reviews
CREATE POLICY "Reviews are viewable by everyone" ON reviews
    FOR SELECT USING (true);

CREATE POLICY "Users can create reviews" ON reviews
    FOR INSERT TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reviews" ON reviews
    FOR UPDATE TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reviews" ON reviews
    FOR DELETE TO authenticated
    USING (auth.uid() = user_id);
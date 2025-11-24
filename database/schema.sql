-- جدول کاربران
CREATE TABLE IF NOT EXISTS users (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    role text NOT NULL DEFAULT 'user', -- user, manager, admin
    created_at timestamp with time zone DEFAULT now()
);

-- جدول محصولات تولیدی
CREATE TABLE IF NOT EXISTS products (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    sku text UNIQUE NOT NULL,
    description text,
    unit_price numeric(12,2),
    quantity_in_stock integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now()
);

-- جدول سفارش تولید (Work Orders)
CREATE TABLE IF NOT EXISTS work_orders (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id uuid REFERENCES products(id),
    quantity integer NOT NULL,
    status text DEFAULT 'pending', -- pending, in_progress, completed
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- جدول پیام‌ها
CREATE TABLE IF NOT EXISTS messages (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    sender_id uuid REFERENCES users(id),
    receiver_id uuid REFERENCES users(id),
    message text NOT NULL,
    role text NOT NULL, -- user or agent
    created_at timestamp with time zone DEFAULT now()
);

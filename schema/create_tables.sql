use coffee_house;

CREATE TABLE IF NOT EXISTS coffee_products
(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(120) NOT NULL,
    price INT NOT NULL,
    is_extra BOOL NOT NULL DEFAULT 0,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS coffee_orders
(
    id INT NOT NULL AUTO_INCREMENT,
    purchased DATETIME NOT NULL,
    total_price INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS coffee_order_items
(
    order_id INT NOT NULL,
    item_id INT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES coffee_orders (id),
    FOREIGN KEY (item_id) REFERENCES coffee_products (id)
);

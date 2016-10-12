use coffee_house;

CREATE TABLE IF NOT EXISTS coffee_beverages
(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(120) NOT NULL,
    price INT NOT NULL,
    doubleable BOOL NOT NULL DEFAULT 0,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS coffee_extras
(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(120) NOT NULL,
    price INT NOT NULL DEFAULT 0,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS coffee_orders
(
    id INT NOT NULL AUTO_INCREMENT,
    purchased DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    total_price INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS coffee_order_beverages
(
    order_id INT NOT NULL,
    item_id INT NOT NULL,
    is_double BOOLEAN NOT NULL DEFAULT 0,
    FOREIGN KEY (order_id) REFERENCES coffee_orders (id),
    FOREIGN KEY (item_id) REFERENCES coffee_beverages (id)
);

CREATE TABLE IF NOT EXISTS coffee_order_extras
(
    order_id INT NOT NULL,
    extra_id INT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES coffee_orders (id),
    FOREIGN KEY (extra_id) REFERENCES coffee_extras (id)
);

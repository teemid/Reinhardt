USE coffee_house;

CREATE TABLE beverages
(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(120) NOT NULL,
    PRICE INT NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE extras
(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(120) NOT NULL,
    PRICE INT NOT NULL,
    PRIMARY KEY(id)
);


CREATE TABLE order
(
    id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY(id)
)


CREATE TABLE order_items
(
    order_id INT NOT NULL,
    item_id INT NOT NULL,
    CONSTRAINT fk_order FOREIGN KEY (order_id)
    REFERENCES order(id)
)

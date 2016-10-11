use coffee_house;

INSERT INTO coffee_products (name, price, doubleable) VALUES
    ('Coffee', 29, DEFAULT), ('Espresso', 39, 1), ('Java', 35, DEFAULT);

INSERT INTO coffee_extras (name, price) VALUES
    ('Straw', DEFAULT), ('Ice', DEFAULT), ('Milk', 5), ('Sugar', 5), ('Chocolate sprinkles', 5);

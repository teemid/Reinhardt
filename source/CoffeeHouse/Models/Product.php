<?php

namespace CoffeeHouse\Models;

use \Core\Database as Database;
use \Core\Model as Model;


class Product extends Model
{
    public $id;
    public $name;
    public $price;
    public $doubleable;

    protected static $sql_select_all = 'SELECT * FROM coffee_products;';
    protected static $sql_select_by_id = 'SELECT * FROM coffee_products WHERE id = :id;';
    protected static $sql_create = "INSERT INTO coffee_products (name, price, doubleable) VALUES (:name, :price, :doubleable);";
    protected static $sql_delete = 'DELETE FROM coffee_products WHERE id = ?;';

    public function __toString() {
        return __CLASS__ . ": $this->name $this->price";
    }
}

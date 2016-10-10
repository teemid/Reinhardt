<?php

namespace CoffeeHouse\Models;

use \Core\Database as Database;
use \Core\Model as Model;


class Product extends Model
{
    public $id;
    public $name;
    public $price;
    public $is_extra;

    protected static $sql_select_all = 'SELECT * FROM coffee_products;';
    protected static $sql_select_by_id = 'SELECT * FROM coffee_products WHERE id = :id;';
    protected static $sql_create = "INSERT INTO coffee_products (name, price, is_extra) VALUES (:name, :price, :is_extra);";

    public function __toString() {
        return __CLASS__ . ": $this->name $this->price";
    }
}

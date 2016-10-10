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

    protected static $sql_select_all = "SELECT * FROM coffee_products;";
    protected static $sql_select_by_id = "SELECT * FROM coffee_products WHERE id = ?;";

    public function __toString() {
        return __CLASS__ . ": $this->name $this->price";
    }
}

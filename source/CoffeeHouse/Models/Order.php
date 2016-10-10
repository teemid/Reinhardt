<?php

namespace CoffeeHouse\Models;

use \Core\Model as Model;


class Order extends Model
{
    public $id;
    public $products;

    protected static $sql_select_all = "SELECT * FROM coffee_orders;";
    protected static $sql_select_by_id = "SELECT * FROM coffee_orders WHERE id = ?;";

    public function __toString () {
        return __CLASS__ . ": $this->id";
    }
}

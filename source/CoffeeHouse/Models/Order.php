<?php

namespace CoffeeHouse\Models;

use \Core\Model as Model;


class Order extends Model
{
    public $id;
    public $products = array();
    public $extras = array();

    protected static $sql_select_all = 'SELECT * FROM coffee_orders;';
    protected static $sql_select_by = 'SELECT * FROM coffee_orders WHERE ? = ?;';
    protected static $sql_create = 'INSERT INTO coffee_orders (order_id, product_id) VALUES (:order_id, :product_id);';
    protected static $sql_delete = 'SELECT * FROM coffee_orders WHERE id = ?;';

    public function __toString () {
        return __CLASS__ . ": $this->id";
    }
}

<?php

namespace CoffeeHouse\Models;

use \Reinhardt\Model as Model;


class Extra extends Model
{
    public $id;
    public $name;
    public $price;

    protected static $sql_select_all = 'SELECT * FROM coffee_extras;';
    protected static $sql_select_by_id = 'SELECT * FROM coffee_extras WHERE id = :id;';
    protected static $sql_create = 'INSERT INTO coffee_extras (name, price) VALUES (:name, :price);';
    protected static $sql_delete = 'DELETE FROM coffee_extras WHERE id = :id;';

    public function __toString() {
        return __CLASS__ . ': ' .$this->id;
    }
}

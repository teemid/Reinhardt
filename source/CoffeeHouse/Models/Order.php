<?php

namespace CoffeeHouse\Models;


class Order
{
    public $id;
    public $products;

    public function __toString () {
        return __CLASS__ . ": $this->id";
    }
}

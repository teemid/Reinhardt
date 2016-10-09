<?php

namespace CoffeeHouse\Models;

class Order
{
    public $id;
    public $products;

    public function __toString () {
        return \get_class($this) . ": $this->id";
    }
}

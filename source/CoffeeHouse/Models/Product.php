<?php

namespace CoffeeHouse\Models;

class Product
{
    public $id;
    public $name;
    public $price;
    public $is_extra;

    public __toString() {
        return \get_class($this) . ": $this->name $this->price";
    }
}

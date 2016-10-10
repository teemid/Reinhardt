<?php

namespace CoffeeHouse\Models;


class Product
{
    public $id;
    public $name;
    public $price;
    public $is_extra;

    public __toString() {
        return __CLASS__ . ": $this->name $this->price";
    }
}

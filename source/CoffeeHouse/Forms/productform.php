<?php

namespace CoffeeHouse\Forms;

use \Core\Form as Form;
use \Core\Exceptions\ValidationError as ValidationError;

use \Coffee\Models\Product as Product;


class ProductForm extends Form
{
    protected $required = array('name', 'price', 'is_extra');

    public function validate_name($name)
    {
        if (\gettype($name) != 'string')
        {
            throw new ValidationError('Invalid product name.');
        }

        $this->validate_string_length('name', 120);
    }

    public function validate_price($price)
    {
        print($price . '<br>');
    }

    public function validate_is_extra($is_extra)
    {

    }
}

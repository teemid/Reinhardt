<?php

namespace CoffeeHouse\Forms;

use \Reinhardt\Form as Form;


class OrderForm extends Form
{
    private $requirements = array(
        'products' => array('foreign_key' => true)
    )
}

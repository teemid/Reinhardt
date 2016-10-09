<?php

namespace Core;

use PDO;

class Database
{
    private $pdo;
    private static $host = 'db';
    private static $port = '3306';

    function __construct($username, $password)
    {
        $this->pdo = new PDO(
            'mysql:host=db;port=3306;database=digipub', $username, $password,
            array(PDO::ATTR_PERSISTENT => true)
        );
    }

    function __destruct()
    {
        $this->pdo = null;
    }
}

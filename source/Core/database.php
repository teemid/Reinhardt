<?php

namespace Core;

use PDO;


class Database
{
    private $pdo;
    private static $database = 'coffee_house';
    private static $host = 'db';
    private static $port = '3306';
    private static $username = 'test';
    private static $password = 'test';

    function __construct()
    {
        $this->pdo = new PDO(
            'mysql:host=' . self::$host . ';port=' . self::$port .
            ';dbname=' . self::$database, self::$username, self::$password,
            array(PDO::ATTR_PERSISTENT => true, PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION)
        );
    }

    function __destruct()
    {
        $this->pdo = null;
    }

    public function query($sql_query) {
        $sql_query = \addslashes($sql_query);

        $statement = $this->pdo->prepare($sql_query);
        $statement->execute();

        return $statement->fetchAll();
    }

    public function fetch_class($sql_query, $class_name) {
        // NOTE (Emil): Escape the query before we do anything with it.
        $sql_query = \addslashes($sql_query);

        $statement = $this->pdo->prepare($sql_query);
        $statement->setFetchMode(\PDO::FETCH_CLASS | \PDO::FETCH_PROPS_LATE, $class_name);
        $statement->execute();

        return $statement->fetchAll();
    }
}

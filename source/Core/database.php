<?php

namespace Core;

use PDO;


class Database
{
    private static $pdo = null;
    private static $database = 'coffee_house';
    private static $host = 'db';
    private static $port = '3306';
    private static $username = 'test';
    private static $password = 'test';

    function __construct()
    {
        if (!$pdo)
        {
            self::$pdo = new PDO(
                'mysql:host=' . self::$host . ';port=' . self::$port .
                ';dbname=' . self::$database, self::$username, self::$password,
                array(PDO::ATTR_PERSISTENT => true, PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION)
            );
        }
    }

    function __destruct()
    {
        self::$pdo = null;
    }

    public function query($sql_query) {
        $sql_query = \addslashes($sql_query);

        $statement = self::$pdo->prepare($sql_query);
        $statement->execute();

        return $statement->fetchAll();
    }

    public function fetch_class($sql_query, $class_name, $arguments = array()) {
        $err = $statement = self::$pdo->prepare($sql_query);
        $statement->setFetchMode(PDO::FETCH_CLASS | PDO::FETCH_PROPS_LATE, $class_name);

        foreach ($arguments as $key => $value)
        {
            $string = \addslashes($value);
            $statement->bindParam(':' . $key, $value);
        }

        $statement->execute($arguments);

        return $statement->fetchAll();
    }
}

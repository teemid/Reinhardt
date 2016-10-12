<?php

namespace Reinhardt;

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

    public function lastInsertedId($name = null) {
        return self::$pdo->lastInsertId($name);
    }

    public function query($sql_query, $arguments = array()) {
        $statement = self::$pdo->prepare($sql_query);
        $statement = $this->bind_parameters($statement, $arguments);

        return $statement->execute();
    }

    public function fetch_class($sql_query, $class_name, $arguments = array()) {
        $statement = self::$pdo->prepare($sql_query);
        $statement->setFetchMode(PDO::FETCH_CLASS | PDO::FETCH_PROPS_LATE, $class_name);
        $statement = $this->bind_parameters($statement, $arguments);
        $statement->execute();

        return $statement->fetchAll();
    }

    public function fetch($sql_query, $arguments = array()) {
        $statement = self::$pdo->prepare($sql_query);
        $statement = $this->bind_parameters($statement, $arguments);
        $statement->execute();

        return $statement->fetchAll();
    }

    private function bind_parameters($statement, $arguments) {
        foreach ($arguments as $key => $value)
        {
            $new_key = ':' . $key;

            $statement->bindValue($new_key, $value);
        }

        return $statement;
    }
}

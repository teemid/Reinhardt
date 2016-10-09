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

    public function query(sql_query) {

    }

    public function fetch_class(sql_query, class_name) {
        // NOTE (Emil): Escape the query before we do anything with it.
        sql_query = \addslashes(sql_query);

        $statement = $pdo->prepare(sql_query);
        $statement->setFetchMode(\PDO::FETCH_CLASS, class_name);
        $statement->execute();

        return $statement->fetch();
    }
}

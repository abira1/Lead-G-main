<?php
/**
 * Database Configuration
 * Lead G - MySQL Database Connection
 */

// Prevent direct access
if (!defined('LEADG_ACCESS')) {
    die('Direct access not permitted');
}

// Database Configuration
define('DB_HOST', 'localhost');
define('DB_NAME', 'u530488780_toiraldbhub');
define('DB_USER', 'u530488780_leadgdb');
define('DB_PASS', '2oiraldb#passLeadG123');
define('DB_CHARSET', 'utf8mb4');

// Database Connection Class
class Database {
    private static $instance = null;
    private $connection;
    private $host = DB_HOST;
    private $dbname = DB_NAME;
    private $username = DB_USER;
    private $password = DB_PASS;
    private $charset = DB_CHARSET;
    
    private function __construct() {
        $dsn = "mysql:host={$this->host};dbname={$this->dbname};charset={$this->charset}";
        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
            PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES {$this->charset}"
        ];
        
        try {
            $this->connection = new PDO($dsn, $this->username, $this->password, $options);
        } catch (PDOException $e) {
            error_log('Database Connection Error: ' . $e->getMessage());
            
            if (ENVIRONMENT === 'development') {
                die('Database connection failed: ' . $e->getMessage());
            } else {
                die('Database connection failed. Please contact support.');
            }
        }
    }
    
    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    public function getConnection() {
        return $this->connection;
    }
    
    // Prevent cloning
    private function __clone() {}
    
    // Prevent unserialization
    public function __wakeup() {
        throw new Exception("Cannot unserialize singleton");
    }
}

// Helper function to get database connection
function getDB() {
    return Database::getInstance()->getConnection();
}
?>
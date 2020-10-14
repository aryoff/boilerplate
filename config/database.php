<?php

use Illuminate\Support\Str;

$default = env('DB_CONNECTION', 'mysql');

$connections['sqlite'] = [
    'driver' => 'sqlite',
    'url' => env('DATABASE_URL'),
    'database' => env('DB_DATABASE', database_path('database.sqlite')),
    'prefix' => '',
    'foreign_key_constraints' => env('DB_FOREIGN_KEYS', true),
];

$connections['mysql'] = [
    'driver' => 'mysql',
    'url' => env('DATABASE_URL'),
    'host' => env('DB_HOST', '127.0.0.1'),
    'port' => env('DB_PORT', '3306'),
    'database' => env('DB_DATABASE', 'forge'),
    'username' => env('DB_USERNAME', 'forge'),
    'password' => env('DB_PASSWORD', ''),
    'unix_socket' => env('DB_SOCKET', ''),
    'charset' => 'utf8mb4',
    'collation' => 'utf8mb4_unicode_ci',
    'prefix' => '',
    'prefix_indexes' => true,
    'strict' => true,
    'engine' => null,
    'options' => extension_loaded('pdo_mysql') ? array_filter([
        PDO::MYSQL_ATTR_SSL_CA => env('MYSQL_ATTR_SSL_CA'),
    ]) : [],
];

$connections['pgsql'] = [
    'driver' => 'pgsql',
    'url' => env('DATABASE_URL'),
    'host' => env('DB_HOST', '127.0.0.1'),
    'port' => env('DB_PORT', '5432'),
    'database' => env('DB_DATABASE', 'forge'),
    'username' => env('DB_USERNAME', 'forge'),
    'password' => env('DB_PASSWORD', ''),
    'charset' => 'utf8',
    'prefix' => '',
    'prefix_indexes' => true,
    'schema' => 'public',
    'sslmode' => 'prefer',
];

$connections['sqlsrv'] = [
    'driver' => 'sqlsrv',
    'url' => env('DATABASE_URL'),
    'host' => env('DB_HOST', 'localhost'),
    'port' => env('DB_PORT', '1433'),
    'database' => env('DB_DATABASE', 'forge'),
    'username' => env('DB_USERNAME', 'forge'),
    'password' => env('DB_PASSWORD', ''),
    'charset' => 'utf8',
    'prefix' => '',
    'prefix_indexes' => true,
];

switch ($default) {
    case 'pgsql':
        $connections['mirror'] = [
            'driver' => 'pgsql',
            'url' => env('DATABASE_URL_MIRROR'),
            'host' => env('DB_HOST_MIRROR', $connections['pgsql']['host']),
            'port' => env('DB_PORT_MIRROR', $connections['pgsql']['port']),
            'database' => env('DB_DATABASE_MIRROR', $connections['pgsql']['database']),
            'username' => env('DB_USERNAME_MIRROR', $connections['pgsql']['username']),
            'password' => env('DB_PASSWORD_MIRROR', $connections['pgsql']['password']),
            'charset' => 'utf8',
            'prefix' => '',
            'prefix_indexes' => true,
            'schema' => 'public',
            'sslmode' => 'prefer',
        ];
        break;
    case 'sqlsrv':
        $connections['mirror'] = [
            'driver' => 'sqlsrv',
            'url' => env('DATABASE_URL_MIRROR'),
            'host' => env('DB_HOST_MIRROR', $connections['sqlsrv']['host']),
            'port' => env('DB_PORT_MIRROR', $connections['sqlsrv']['port']),
            'database' => env('DB_DATABASE_MIRROR', $connections['sqlsrv']['database']),
            'username' => env('DB_USERNAME_MIRROR', $connections['sqlsrv']['username']),
            'password' => env('DB_PASSWORD_MIRROR', $connections['sqlsrv']['password']),
            'charset' => 'utf8',
            'prefix' => '',
            'prefix_indexes' => true,
        ];
        break;

    default:
        $connections['mirror'] = [
            'driver' => 'mysql',
            'url' => env('DATABASE_URL_MIRROR'),
            'host' => env('DB_HOST_MIRROR', $connections['mysql']['host']),
            'port' => env('DB_PORT_MIRROR', $connections['mysql']['port']),
            'database' => env('DB_DATABASE_MIRROR', $connections['mysql']['database']),
            'username' => env('DB_USERNAME_MIRROR', $connections['mysql']['username']),
            'password' => env('DB_PASSWORD_MIRROR', $connections['mysql']['password']),
            'unix_socket' => env('DB_SOCKET_MIRROR', $connections['mysql']['unix_socket']),
            'charset' => 'utf8mb4',
            'collation' => 'utf8mb4_unicode_ci',
            'prefix' => '',
            'prefix_indexes' => true,
            'strict' => true,
            'engine' => null,
            'options' => extension_loaded('pdo_mysql') ? array_filter([
                PDO::MYSQL_ATTR_SSL_CA => env('MYSQL_ATTR_SSL_CA'),
            ]) : [],
        ];
        break;
}

return [

    /*
    |--------------------------------------------------------------------------
    | Default Database Connection Name
    |--------------------------------------------------------------------------
    |
    | Here you may specify which of the database connections below you wish
    | to use as your default connection for all database work. Of course
    | you may use many connections at once using the Database library.
    |
    */

    'default' => $default,

    /*
    |--------------------------------------------------------------------------
    | Database Connections
    |--------------------------------------------------------------------------
    |
    | Here are each of the database connections setup for your application.
    | Of course, examples of configuring each database platform that is
    | supported by Laravel is shown below to make development simple.
    |
    |
    | All database work in Laravel is done through the PHP PDO facilities
    | so make sure you have the driver for your particular database of
    | choice installed on your machine before you begin development.
    |
    */

    'connections' => $connections,

    /*
    |--------------------------------------------------------------------------
    | Migration Repository Table
    |--------------------------------------------------------------------------
    |
    | This table keeps track of all the migrations that have already run for
    | your application. Using this information, we can determine which of
    | the migrations on disk haven't actually been run in the database.
    |
    */

    'migrations' => 'migrations',

    /*
    |--------------------------------------------------------------------------
    | Redis Databases
    |--------------------------------------------------------------------------
    |
    | Redis is an open source, fast, and advanced key-value store that also
    | provides a richer body of commands than a typical key-value system
    | such as APC or Memcached. Laravel makes it easy to dig right in.
    |
    */

    'redis' => [

        'client' => env('REDIS_CLIENT', 'phpredis'),

        'options' => [
            'cluster' => env('REDIS_CLUSTER', 'redis'),
            'prefix' => env('REDIS_PREFIX', Str::slug(env('APP_NAME', 'laravel'), '_').'_database_'),
        ],

        'default' => [
            'url' => env('REDIS_URL'),
            'host' => env('REDIS_HOST', '127.0.0.1'),
            'password' => env('REDIS_PASSWORD', null),
            'port' => env('REDIS_PORT', '6379'),
            'database' => env('REDIS_DB', '0'),
        ],

        'cache' => [
            'url' => env('REDIS_URL'),
            'host' => env('REDIS_HOST', '127.0.0.1'),
            'password' => env('REDIS_PASSWORD', null),
            'port' => env('REDIS_PORT', '6379'),
            'database' => env('REDIS_CACHE_DB', '1'),
        ],

    ],

];

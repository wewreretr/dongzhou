<?php
return [
	'SERVER_NAME' => "EasySwoole",
	'MAIN_SERVER' => [
		'LISTEN_ADDRESS' => '0.0.0.0',
		'PORT' => 9504,
		'SERVER_TYPE' => EASYSWOOLE_WEB_SERVER, //可选为 EASYSWOOLE_SERVER  EASYSWOOLE_WEB_SERVER EASYSWOOLE_WEB_SOCKET_SERVER,EASYSWOOLE_REDIS_SERVER
		'SOCK_TYPE' => SWOOLE_TCP,
		'RUN_MODEL' => SWOOLE_PROCESS,
		'SETTING' => [
			'worker_num' => 8,
			'max_wait_time' => 3,
			'reload_async' => true,
		],
		'TASK' => [
			'timeout' => 15,
			'workerNum' => 4,
			'maxRunningNum' => 128,
		],
	],
	'TEMP_DIR' => '/Temp',
	'LOG_DIR' => '/Temp/Log',
	'IMG_DIR' => '/Public/image',
	'DEBUG' => true,
	'KEY' => '43810BF4BF94CB49FD8BC1976CAA7E7E',
	'MYSQL' => [
		'host' => '8.210.195.192',
		'port' => '3317',
		'timeout' => '5',
		'charset' => 'utf8mb4',
		'username' => 'root',
		'password' => 'prybEL5CaeK5rsMT',
		'database' => 'es_admin',
		'prefix' => 'admin',
	],
	'REDIS' => [
		'host' => '127.0.0.1',
		'auth' => 'root',
		'port' => 6379,
		'timeout' => 3,
		'db' => 0,
	],
];

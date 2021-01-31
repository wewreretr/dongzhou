<?php

namespace EasySwoole\EasySwoole;

use EasySwoole\Http\Request;
use EasySwoole\Http\Response;
use EasySwoole\RedisPool\Redis;
use EasySwoole\Redis\Config\RedisConfig;
use EasySwoole\ORM\Db\Config as dbConfig;
use EasySwoole\ORM\DbManager as DbManager;
use EasySwoole\ORM\Db\Connection as DbConnection;
use EasySwoole\EasySwoole\Swoole\EventRegister;
use EasySwoole\EasySwoole\AbstractInterface\Event;

class EasySwooleEvent implements Event
{

	public static function initialize()
	{
		date_default_timezone_set('Asia/Shanghai');

		self::loadAppConfig();
		self::initRedis();
		self::initMysql();
	}

	// 加載項目配置
	private static function loadAppConfig()
	{
		$files = \App\HttpHelper\File::scanDirectory(EASYSWOOLE_ROOT . '/App/HttpConfig', 'php');
		if (is_array($files)) {
			foreach ($files as $file) {
				Config::getInstance()->loadFile($file, true);
			}
		}
	}

	// 配置Redis緩存
	private static function initRedis()
	{
		$config = Config::getInstance()->getConf('REDIS');

		$poolConfig = new RedisConfig();
		$poolConfig->setDb($config['db']);
		$poolConfig->setHost($config['host']);
		$poolConfig->setPort($config['port']);
		$poolConfig->setAuth($config['auth']);
		$poolConfig->setTimeout($config['timeout']);
		$pool = Redis::getInstance()->register('redis', $poolConfig);
		//配置连接池连接数
		$pool->setMinObjectNum(5);
		$pool->setMaxObjectNum(20);
	}

	// 配置数据库
	private static function initMysql()
	{
		$config = Config::getInstance()->getConf('MYSQL');

		$dbConfig = new dbConfig();
		$dbConfig->setDatabase($config['database']);
		$dbConfig->setUser($config['username']);
		$dbConfig->setPassword($config['password']);
		$dbConfig->setHost($config['host']);
		$dbConfig->setPort($config['port']);
		$dbConfig->setCharset($config['charset']);
		//连接池配置
		$dbConfig->setGetObjectTimeout(3.0); //设置获取连接池对象超时时间
		$dbConfig->setIntervalCheckTime(30 * 1000); //设置检测连接存活执行回收和创建的周期
		$dbConfig->setMaxIdleTime(15); //连接池对象最大闲置时间(秒)
		$dbConfig->setMaxObjectNum(20); //设置最大连接池存在连接对象数量
		$dbConfig->setMinObjectNum(5); //设置最小连接池存在连接对象数量
		$dbConfig->setAutoPing(5); //设置自动ping客户端链接的间隔
		DbManager::getInstance()->addConnection(new DbConnection($dbConfig));
	}

	// 初始主服务
	public static function mainServerCreate(EventRegister $register)
	{
		// 热重载
		$hotReloadOptions = new \EasySwoole\HotReload\HotReloadOptions;
		$hotReload = new \EasySwoole\HotReload\HotReload($hotReloadOptions);
		$hotReloadOptions->setMonitorFolder([EASYSWOOLE_ROOT . '/App']);
		$server = ServerManager::getInstance()->getSwooleServer();
		$hotReload->attachToServer($server);

	}

	public static function onRequest(Request $request, Response $response): bool
	{
		return true;
	}

	public static function afterRequest(Request $request, Response $response): void
	{
	}
}
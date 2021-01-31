<?php

namespace App\HttpModel;

use App\HttpCommon\Model;
use EasySwoole\EasySwoole\Config;
use EasySwoole\ORM\AbstractModel;
use EasySwoole\ORM\Db\Cursor;
use EasySwoole\ORM\Db\CursorInterface;

class Auth extends Model
{
	protected $tableName = 'admin_auth';

	/**
	 * 登录校验
	 * @param $username
	 * @param $password
	 * @return Auth|array|bool|AbstractModel|Cursor|CursorInterface|null
	 */
	public function login($username, $password)
	{
		$user = $this->getOne(['uname' => $username, 'deleted' => 0], 'id,uname,encry,pwd,role_id,display_name,nickname,photo');
		if (empty($user) || $this->encryptPassword($password, $user['encry']) != $user['pwd']) return false;
		unset($user['pwd'], $user['encry']);
		return $user;
	}

	/**
	 * 密码加密
	 * @param string $password
	 * @param string $encry
	 * @return string
	 */
	public function encryptPassword(string $password, string $encry): string
	{
		$key = Config::getInstance()->getConf('KEY');
		return md5($encry . $password . $key);
	}

}
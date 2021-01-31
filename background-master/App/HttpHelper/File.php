<?php

namespace App\HttpHelper;

use Throwable;

class File
{
	/**
	 * 遍历目录
	 * @param string $path
	 * @param string $suffix
	 * @return array|false
	 */
	static function scanDirectory(string $path, string $suffix)
	{
		if (empty($path) || !is_dir($path)) return false;

		$path = rtrim($path, '/') . '/';

		$files = [];
		try {
			$items = scandir($path);
			foreach ($items as $file) {
				if ($file == '.' || $file == '..') continue;
				$realPath = $path . $file;
				if (is_dir($realPath)) continue;
				if (is_file($realPath) && (empty($suffix) || preg_match('/' . $suffix . '$/', $file))) {
					$files[] = $realPath;
				}
			}
		} catch (Throwable $throwable) {
			return false;
		}

		return $files;
	}

}
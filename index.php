<?php

define('URL', 'http://web.archive.org/web/*/');

$found = array();
if (isset ($_FILES['urls']) && $_POST['user'] == 'cheker' && $_POST['pass'] == 'morningglory') {
	set_time_limit(0);
	$urls = file($_FILES['urls']['tmp_name']);
	$filename = $_FILES['urls']['name'];
	foreach ($urls as $url) {
		$result = @file_get_contents(URL . trim($url));
		if ($result !== false && strpos($result, 'Hrm') === false) {
			$found[] = $url;
		}
	}
}

require 'view.php';
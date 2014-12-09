<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>URL Checker v.0.1<?php if (isset($filename)): echo ' - ' . htmlentities($filename); endif;?></title>
		<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
		<script src="main.js"></script>
    </head>
    <body>
		<form action="index.php" method="post" enctype="multipart/form-data">
			<label>
				Username
				<input type="text" name="user">
			</label>
			<label>
				Password
				<input type="password" name="pass">
			</label>
			<label>
				Choose file
				<input name="urls" type="file" id="file-input">
			</label>
			<input type="submit">
		</form>
		<ul>
			<?php foreach ($found as $url):?>
			<li>
				<a href="<?php echo htmlspecialchars($url);?>" target="_blank">
					<?php echo htmlspecialchars($url);?>
				</a>
			</li>
			<?php endforeach;?>
		</ul>
    </body>
</html>



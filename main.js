$(document).ready(function() {
	
	var fileInput = $('#file-input');
	var goBtn = $('#go-btn');
	var urlsList = $('#urls-list');
	
	var rowsCnt;
	var rowsChecked;
	
	function readFile(callback) {
		if (fileInput.get(0).files.length === 0) {
			alert('No file selected');
			return;
		}
		var fr = new FileReader();
		fr.onloadend = function() {
			var rows = fr.result.split('\n');
			for (var i = 0; i < rows.length; i++) {
				rows[i] = $.trim(rows[i]);
			}
			callback(rows);
		};
		fr.readAsText(fileInput.get(0).files[0]);
		return;
	}
	
	function handleURLCheckResponse(error, url) {
		return function(response) {
			if (!error && response.archived_snapshots.closest) {
				var link = $('<a></a>')
							.prop('href', response.archived_snapshots.closest.url)
							.prop('target', '_blank')
							.html(url);
			} else {
				link = $('<span></span>');
				if (error) {
					link.css('color', 'maroon').html(url + ' - Network error!');
				} else {
					link.html(url);
				}
			}
			var li = $('<li></li>').html(link);
			urlsList.append(li);
			rowsChecked++;
			if (rowsChecked === rowsCnt) {
				alert('Finished');
			}
		};
	}
	
	
	function check(rows) {
		urlsList.html('');
		rowsCnt = rows.length;
		rowsChecked = 0;
		for (var i = 0; i < rowsCnt; i++) {
			$.ajax({
				url: 'http://archive.org/wayback/available/',
				data: {
					'url': rows[i]
				},
				dataType: 'jsonp',
				success: handleURLCheckResponse(false, rows[i]),
				error: handleURLCheckResponse(true, rows[i])
			});
		}
	}
	
	goBtn.click(function() {
		readFile(check);
		return false;
	});
	
});
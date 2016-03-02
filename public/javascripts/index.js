$(function() {
	$('#searchbtn').click(function() {
		var parameters = {
			profile: $('#search').val()
		};
		$.get('/profile', parameters, function(data) {
		});
	});
});
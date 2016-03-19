$(function() {
	$('#searchbtn').click(function() {
		var parameters = {
			profile: $('#search').val()
		};
		$.get('/profile', parameters, function(data) {
			console.log(data)
			$('.main-content').addClass("show-things")
			$('.profile-pic').attr("src",data.authorImg)
			$('.fullname').html(data.fullName)
			$('.email').html(data.links.email).attr("href","mailto:"+data.links.email)
			$('.homepage').html(data.links.homepage).attr("href",data.links.homepage)
			$('.github').html(data.links.github).attr("href",data.links.github)
			$('.twitter').html(data.links.twitter).attr("href",data.links.twitter)
			$('.freenode').html(data.links.freenode).attr("href",data.links.freenode)
		});
	});
});
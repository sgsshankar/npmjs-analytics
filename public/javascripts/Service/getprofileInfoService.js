npmModule.factory('userProfile', function($resource){
	return $resource('http://localhost:3000/profile/:userName', {username:'@userName'}, {
		update: {
			method:'PUT'
		}
	});
});

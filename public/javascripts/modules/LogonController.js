function LogonController($scope, $http) {

	function Logon() {
		this.email = '';
		this.senha = '';
		this.remember_me=false;
	}

	$scope.logon = new Logon();

	$scope.logons = [];

	$http.get('/logons').success(function(retorno) {
		$scope.logons = retorno.logons;
	});

	$scope.entrar = function() {
		var logon = $scope.logon;
		$http.post('/logon', $scope.logon).success(function(retorno) {
			localStorage.usuarioSession = JSON.stringify(retorno.usuarioSession);
			$scope.logons.push($scope.logon);
			$scope.logon = new Logon();
			controllers.alerts.addAlert(retorno.alerts);
			if (retorno.redirect != undefined)
			{
				$scope.changeRoute(retorno.redirect);
			}
		});
	}
	controllers.logon = $scope;
	$scope.changeRoute = function(url, forceReload) {
		$scope = $scope || angular.element(document).scope();
        if(forceReload || $scope.$$phase) { // that's right TWO dollar signs: $$phase
        	window.location = url;
    } else {
    	$location.path(url);
    	$scope.$apply();
    }
};	
}

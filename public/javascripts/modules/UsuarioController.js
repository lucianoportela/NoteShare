function UsuarioController($scope, $http) {

	function Usuario() {
		this.nome ='';
		this.email = '';
		this.senha = '';
	}

	$scope.usuario = new Usuario();

	$scope.usuarios = [];

	$http.get('/usuarios').success(function(retorno) {
		$scope.usuarios = retorno.usuarios;
	});

	$scope.adicionaUsuario = function() {
		$http.post('/usuario', $scope.usuario).success(function(retorno) {
			localStorage.usuarioSession = JSON.stringify(retorno.usuarioSession);
			$scope.usuarios.push($scope.usuario);
			$scope.usuario = new Usuario();

			if (retorno.redirect != undefined)
			{
				$scope.changeRoute(retorno.redirect);
			}
		});
	}
	$scope.changeRoute = function(url, forceReload) {
		$scope = $scope || angular.element(document).scope();
		if(forceReload || $scope.$$phase) { 
			window.location = url;
		} else {
			$location.path(url);
			$scope.$apply();
		}
	};	
}
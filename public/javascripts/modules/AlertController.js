
function AlertController($scope, $http) {


	function Alert() {
		this.type = '';
		this.label = '';
		this.msg = '';
	}
	$scope.alert = new Alert();


/*	$scope.alerts = [
    { type: 'danger', label:'Perigo!', msg: 'Perigo.' },
    { type: 'success', label:'Sucesso!', msg: 'Sucesso.' },
    { type: 'info', label:' Informação!', msg: 'Informação.' },
    { type: 'warning', label:'Aviso!', msg: 'Aviso.' }
  ];
*/
	$scope.alerts = [];
	
  $scope.addAlert = function(alerts) {
  	//$scope.alerts=[{ type: 'danger', label:'Perigo!', msg: 'Perigo.' }];
  	$scope.alerts=alerts;
   // $scope.alerts.push(alert);
    $scope.alert = new Alert();



	/*	$http.post('/contato', $scope.contato).success(function() {
			$scope.contatos.push($scope.contato);
			$scope.contato = new Contato();
		});
*/

  };


 /* 	$scope.addAlert2 = function() {
		$http.post('/alert', $scope.contato).success(function() {
			$scope.contatos.push($scope.contato);
			$scope.contato = new Contato();
		});
	}*/

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };
 	controllers.alerts = $scope;
}
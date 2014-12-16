function NotasController($scope, $http) {

	var socket = io.connect('http://localhost:3000/');



	function Nota() {
		this.id='';
		this.usuario_id='';
		this.titulo = '';
		this.descricao = '';
		this.nome='';
		this.email='';
		this.comentario_descricao='';
		this.data='';
		$scope.comandoNota="Adicionar";
		

	}

	function Comentario() {
		this.nota_id='';
	}


	$scope.nota = new Nota();
	$scope.comentario = new Comentario();

	$scope.notas = [];
	$scope.listaNotasUsuario = function() {
		$http.get('/home/notas/'+$scope.usuariosession.usuario_id).success(function(retorno) {
			$scope.notas = retorno.notas;
			$scope.activeTodas='';
			$scope.activeExclusiva='active';

		});
	}
	$scope.listaNotas = function() {
		$http.get('/home/notas').success(function(retorno) {
			$scope.notas = retorno.notas;
			$scope.activeTodas='active';
			$scope.activeExclusiva='';
			
		});
	}		
	$http.get('/home/notas').success(function(retorno) {
		$scope.notas = retorno.notas;
		$scope.usuariosession=JSON.parse(localStorage.usuarioSession) ;      	  
	});

	Array.prototype.insert = function (index, item) {
		this.splice(index, 0, item);
	};


	$scope.salvaNota = function(nota_id) 
	{
		if (nota_id)
		{
			$scope.atualizaNota(nota_id);
		}else{
			$scope.adicionaNota();
		}

	}
	$scope.atualizaNota = function(nota_id) {

		for( var i=0, length=$scope.notas.length;i < length-1;i++)
		{
			if($scope.notas[i].id==nota_id)
			{
				$scope.notas[i].titulo=$scope.nota.titulo;
				$scope.notas[i].descricao=$scope.nota.descricao;
			}
		}




		$scope.nota.usuario_id=$scope.usuariosession.usuario_id;
		$scope.nota.nome=$scope.usuariosession.nome;
		$scope.nota.email=$scope.usuariosession.email;	
		$scope.nota.data=new Date();
		$http.post('/home/notas/update/'+nota_id, $scope.nota).success(function() {	

		   // $scope.notas.insert(0, $scope.nota);
		   socket.emit('send_atualiza_nota', nota_id,$scope.usuariosession.nome);
		   $scope.nota = new Nota();
		});
	}

	socket.on('menssagem_atualiza_nota', function(nota_id,msg){
		alert(msg);  
	});

	$scope.adicionaNota = function() {
		$scope.nota.usuario_id=$scope.usuariosession.usuario_id;
		$scope.nota.nome=$scope.usuariosession.nome;
		$scope.nota.email=$scope.usuariosession.email;	
		$scope.nota.data=new Date();
		$http.post('/home/nota', $scope.nota).success(function(dados) {	
			$scope.nota.id=dados.data.insertId;
			$scope.notas.insert(0, $scope.nota);
			socket.emit('send_nota', $scope.nota);
			$scope.nota = new Nota();
		});
			//$scope.notas.push($scope.nota);
			
			


		}


		socket.on('menssagem_nota', function(nota){
			$scope.notas.insert(0, nota);
			$scope.nota = new Nota();


			$http.get('/home/notas').success(function(retorno) {
				$scope.notas = retorno.notas;

			});




		});



		$scope.adicionaComentario = function(nota_id,_descricao) {		
			$scope.comentario.nota_id=nota_id;
			$scope.comentario.usuario_id=$scope.usuariosession.usuario_id;
			$scope.comentario.nome=$scope.usuariosession.nome;
			$scope.comentario.data=new Date();
			$scope.comentario.descricao=_descricao;
			$http.post('/home/comentario', $scope.comentario).success(function() {

				var item_comentario = {descricao: _descricao,data:new Date(),nome: $scope.comentario.nome};
				for( var i=0, length=$scope.notas.length;i < length;i++)
				{
					if($scope.notas[i].id==nota_id)
					{
						if ($scope.notas[i].comentarios)
						{
							$scope.notas[i].comentarios.push(item_comentario);
						}else
						{
							$scope.notas[i].comentarios=[item_comentario];
						}
						socket.emit('send_comentario', nota_id,item_comentario);
						$scope.notas[i].comentario_descricao='';
					}
				}	
			});
		}

		socket.on('menssagem_comentario', function(nota_id,comentario){

			var item_comentario = comentario;
			for( var i=0, length=$scope.notas.length;i < length;i++)
			{
				if($scope.notas[i].id==nota_id)
				{
					if ($scope.notas[i].comentarios)
					{
						$scope.notas[i].comentarios.push(item_comentario);
					}else
					{
						$scope.notas[i].comentarios=[item_comentario];
					}
					//$scope.notas[i].comentario_descricao='';
					$window.location.reload(true);
				}
			}	

		});


		$scope.editarNota = function(nota_id) {		
			for( var i=0, length=$scope.notas.length;i < length-1;i++)
			{
				if($scope.notas[i].id==nota_id)
				{
					$scope.nota.id=nota_id;
					$scope.comandoNota="Editar";
					$scope.nota.id=$scope.notas[i].id;
					$scope.nota.titulo=$scope.notas[i].titulo;
					$scope.nota.descricao=$scope.notas[i].descricao;

				}
			}
		}
		$scope.cancelar = function() {
			$scope.comandoNota="Adicionar";		
			$scope.nota = new Nota();
		}


		$scope.excluirNota = function(nota_id) {		
			for( var i=0, length=$scope.notas.length;i < length-1;i++)
			{
				if($scope.notas[i].id==nota_id)
				{
					$scope.notas.splice(i, 1);
					length=length-1;

				}
			}

			socket.emit('send_excluir_nota', nota_id,$scope.usuariosession.nome);
			$http.post('/home/notas/delete/'+nota_id).success(function() {

			});
		}

		socket.on('menssagem_excluir_nota', function(nota_id,msg){
			for( var i=0, length=$scope.notas.length;i < length-1;i++)
			{
				if($scope.notas[i].id==nota_id)
				{
					$scope.notas.splice(i, 1);
					length=length-1;

				}
			}

			alert(msg);	  
		});





	}
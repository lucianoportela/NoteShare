var util =require("util");
var moment      = require('moment');


exports.listaNotas = function(req, res){
    req.getConnection(function(err,connection){
        var usuario_id = req.params.usuario_id;
       
        var strFiltro="";
        if (usuario_id)
        {
            strFiltro=" WHERE nota.usuario_id="+usuario_id;
        }

        var sql="SELECT nota.*,usuario.nome,usuario.email "+
         ",comentario.descricao as c_descricao "+
         ",comentario.data as c_data "+
         ",uc.nome as c_usuario_nome "+
         " FROM nota "+
                "INNER JOIN usuario ON nota.usuario_id = usuario.id "+
                  " LEFT  JOIN comentario ON comentario.nota_id = nota.id "+
                  " LEFT  JOIN usuario as uc ON comentario.usuario_id = uc.id "+
                  strFiltro+

                " ORDER BY nota.id DESC ";  



        var query = connection.query(sql,function(err,rows)
        {
           var notas = [];
           var comentarios=[];
           var nota_id=0;
            for (var i = 0, length = rows.length; i < length; i++) {
               
            if ((nota_id==rows[i].id)||(nota_id==0))
            {  
               if (rows[i].c_descricao!=null){
                   comentarios.push({descricao: rows[i].c_descricao,data:rows[i].c_data,nome: rows[i].c_usuario_nome}); 
                } 
            } else { comentarios=[]; }
            if (nota_id!=rows[i].id)
            {
              if (notas[rows[i].id]  ) {
                var nota = rows[i];
                if (rows[i].c_descricao!=null){
                  nota.comentarios = comentarios;
                }
                delete nota.c_descricao;
                delete nota.c_data;
                delete nota.c_usuario_nome;
                notas.push(nota);

              } else {

                var nota = rows[i];
                if (rows[i].c_descricao!=null){
                  nota.comentarios = comentarios;
                }
                delete nota.c_descricao;
                delete nota.c_data;
                delete nota.c_usuario_nome;
                notas.push(nota);
              }
              }

              nota_id=rows[i].id

            }
            if(err) {
                console.log("Error Selecting : %s ",err );
            }
       
            res.json({ notas:notas });
        });
        console.log(query.sql);
    });
 };



exports.listaComentarios = function(req, res){

    var id = req.params.id;
    req.getConnection(function(err,connection){


        var sql="SELECT comentario.*,usuario.nome,usuario.email  FROM comentario "+
                " INNER JOIN usuario ON comentario.usuario_id = usuario.id "+
                " INNER JOIN nota ON comentario.nota_id = nota.id "+
                  " WHERE comentario.nota_id = ? "+
                " ORDER BY comentario.data DESC ";

        var query = connection.query(sql,[id],function(err,rows)
        {
            if(err) {
                console.log("Error Selecting : %s ",err );
            }
            res.json({ comentarios:rows });
        });
        console.log(query.sql);
    });
 };









 exports.salvaNota = function(req,res){


    var input = JSON.parse(JSON.stringify(req.body));   
    req.getConnection(function (err, connection) {
        var nota = {
            usuario_id   : input.usuario_id,
            titulo       : input.titulo,
            descricao    : input.descricao
        };      
      
      
        var query = connection.query("INSERT INTO nota set data=CURRENT_TIMESTAMP(), ? ",nota, function(err, rows)
        {
            if (err)
               console.log("Error inserting : %s ",err );

             
              res.json({ data:rows });
             

            
        });
        console.log(query.sql); 
      
            
        
    });
 };

exports.atualizaNota = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
    
    req.getConnection(function (err, connection) {
        
        var nota = {
            usuario_id   : input.usuario_id,
            titulo       : input.titulo,
            descricao    : input.descricao
        };   
        
        connection.query("UPDATE nota set ? WHERE id = ? ",[nota,id], function(err, rows)
        {
  
          if (err)
              console.log("Error Updating : %s ",err );
         
          res.send(201);
          
        });
    
    });
};








 exports.salvaComentario = function(req,res){


    var input = JSON.parse(JSON.stringify(req.body));  
    req.getConnection(function (err, connection) {
        var comentario = {
            usuario_id   : input.usuario_id,
            nota_id      : input.nota_id,
            descricao    : input.descricao
        };      
      
      
        var query = connection.query("INSERT INTO comentario set data=CURRENT_TIMESTAMP(), ? ",comentario, function(err, rows)
        {
            if (err)
               console.log("Error inserting : %s ",err );
            res.send(201);
        });
        console.log(query.sql); 
      
            
        
    });    
};




exports.deletaNota = function(req,res){
          
     var id = req.params.id;
    
     req.getConnection(function (err, connection) {
        
        connection.query("DELETE FROM nota  WHERE id = ? ",[id], function(err, rows)
        {
            
             if(err)
                 console.log("Error deleting : %s ",err );
            res.send(201);
             
        });

        
     });
};
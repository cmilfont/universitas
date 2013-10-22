module.exports = function(app){
  
  app.get("/meuscursos", function(req, res){
    res.send(JSON.stringify({id: 10, name:"milfont"}));
  });
  
  app.get("/meuscursos/cursado", function(req, res){
    res.send(JSON.stringify({id: 10, name:"milfont"}));
  });

  app.get("/meuscursos/cursado/avaliado", function(req, res){
    res.send(JSON.stringify({id: 10, name:"milfont"}));
  });
  
  app.get("/meuscursos/matriculado", function(req, res){
    res.send(JSON.stringify({id: 10, name:"milfont"}));
  });

  app.get("/meuscursos/matriculado/pago", function(req, res){
    res.send(JSON.stringify({id: 10, name:"milfont"}));
  });

  app.get("/meuscursos/matriculado/pendente", function(req, res){
    res.send(JSON.stringify({id: 10, name:"milfont"}));
  });
  
  app.post("/cursos", function(req, res){
  
  });

  app.post("/cursos/:id/turma", function(req, res){
  
  });

  app.post("/cursos/:curso/turma/:turma/ementa", function(req, res){
    console.log(req.params);
    res.send("ementa");
  });
  /*
  app.post("", function(req, res){
  
  });
  */
};
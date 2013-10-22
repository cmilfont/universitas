module.exports = function(app){
  
  app.get("/users", function(req, res){
    res.send(JSON.stringify({id: 10, name:"milfont"}));
  });
  
};


/*


Meus cursos
  cursos matriculados
    cursos não pagos
    cursos pagos
    cursos avaluados

Meu perfil
  CRUD

Cadastrar curso
  cadastrar turma         /editar  /excluir
  cadastrar ementa      /editar  /excluir

Matricular
Pagar

*/
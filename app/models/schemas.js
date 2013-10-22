var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/universitas');
var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

//mongoose.connect('mongodb://universitas:universitas@flame.mongohq.com:27086/universitas');
console.log(mongoose.connection.host); 


var Privacidade     = {PUBLICO: 1,  PRIVADO: 2}
var UserSchema      = new Schema({ login: String, email: String, photo: String });
var TopicoSchema    = new Schema({ titulo: String, link: String });
var AlunoSchema     = new Schema({ user_id: String });
var InstrutorSchema = new Schema({ user_id: String });
var AulaSchema      = new Schema({data: Date, topicos: [Topico],  avaliacoes: []});

var TurmaSchema = new Schema({
   _id          : ObjectId
  , dataInicial : Date
  , dataFinal   : Date
  , vagas       : Number
  , alunos      : [Aluno]
  , fila        : [Aluno]
  , instrutores : [Instrutor]
  , aulas       : [Aula]
});

var CursoSchema = new Schema({
   _id         : ObjectId
  , titulo     : String
  , descricao  : String
  , privacidade: Number
  , screencast : {
      url      : String
    , titulo   : String
  }
  , ementas    : {
      titulo   : String
    , topicos  : [Topico]
  }
  , turmas     : [Turma]
});


mongoose.model('User'     , UserSchema);
mongoose.model('Topico'   , TopicoSchema);
mongoose.model('Aluno'    , AlunoSchema);
mongoose.model('Instrutor', InstrutorSchema);
mongoose.model('Aula'     , AulaSchema);
mongoose.model('Turma'    , TurmaSchema);
mongoose.model('Curso'    , CursoSchema);

var User      = mongoose.model('User');
var Topico    = mongoose.model('Topico');
var Aluno     = mongoose.model('Aluno');
var Instrutor = mongoose.model('Instrutor');
var Aula      = mongoose.model('Aula');
var Turma     = mongoose.model('Turma');
var Curso     = mongoose.model('Curso');

var curso = new Curso({
    titulo: "Javascript avançado"
  , descricao: "Teste para cadastro de curso"
  , privacidade: Privacidade.PUBLICO
  , screencast: {
      url: "http://www.vimeo.com"
    , titulo: "Javascript básico"
  }
});

curso.save(function (err) {
  if (err) {
    console.log('Erro!', err);
  } else {
    console.log('Success!', curso);
  }
  
  Curso.find({}, function(err, registros){
    console.log("Registros", registros);
    mongoose.disconnect();
  });
  
});
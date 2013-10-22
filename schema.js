var Privacidade = {
  PUBLICO: 1,
  PRIVADO: 2
}

var curso = {
  id:1,
  rev: 1,
  titulo: "html?",
  descricao: "html",
  privacidade: Privacidade.PUBLICO,
  screencast: {
    url: "url",
    titulo: "string"
  },
  ementa: {
    titulo: "string",
    topicos: []
  },
  turmas: []
}

var topico = {
  titulo: "html",
  link: "url"
}

var turma = {
  dataInicial: new Date(),
  dataFinal: new Date(),
  vagas: 6,
  alunos: [],
  fila: [],
  instrutores: [],
  aulas:[]
}

var aula = {
  data: new Date(),
  topicos: [],
  avaliacoes: []
}

var aluno = {
  curso_id: 1,
  user_id: 1
}

var instrutores = {
  
  user_id: 1
}

var user = {
  id: 1,
  login: "",
  email: "",
  photo: "url",
  endereco: {
    
  }
}
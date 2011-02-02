app.get('/', function(req, res){
    res.send('hello world');
});

app.get('/cursos', function(req, res){
    res.send('cursos');
});
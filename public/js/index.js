 ;(function($) {

  var app = $.sammy('#content', function() {
    this.use(Sammy.XTemplate);

    this.get('#/instrutores', function() {
      this.load('instrutores', {cache: true, json:true})
          .render('/templates/instrutores.ejs')
          .swap();
    });
    
    
    this.get('#/home', function() {
      this.partial('/templates/index.ejs');
    });

  });

  $(function() {
    app.run('#/home');
  });
})(jQuery);
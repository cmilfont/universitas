(function($) {

  Sammy = Sammy || {};

  Sammy.XTemplate = function(app, method_alias) {

    var template = function(template, data, name, options) {

      if (typeof name == 'undefined') { name = template; }
      if (typeof options == 'undefined' && typeof name == 'object') {
        options = name; name = template;
      }

      return new Ext.XTemplate( template ).compile().applyTemplate(data);
      
    };

    if (!method_alias) { method_alias = 'ejs'; }
    app.helper(method_alias, template);

  };

})(jQuery);
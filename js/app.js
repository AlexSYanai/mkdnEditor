App = Ember.Application.create();

App.Router.map(function(){
  this.route("reference");
  this.route("notes");
});

var showdown = new Showdown.converter();

Ember.Handlebars.helper('format-markdown', function(input) {
  if (input == undefined)
    return "";
    return new Handlebars.SafeString(showdown.makeHtml(input));
  });

App.NotesRoute = Ember.Route.extend({
  renderTemplate: function() {
    this.render('markdownEditor');
  }
});

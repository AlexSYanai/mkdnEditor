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


// Save Code

App.Note = DS.Model.extend({
  copy: DS.attr()
});

App.NotesRoute = Ember.Route.extend({
  model: function() {
    return this.store.find("note");
  }
});

App.NotesController = Ember.ArrayController.extend({
  actions: {
    markdownInput: function() {
      var copy = this.get("markdownInput");
      if (!copy) {
        return false;
      }

      var note = this.store.createRecord("note", {
        copy: copy
      });

      this.set("markdownInput", "");
      note.save();
    }
  }
});

App.NoteController = Ember.ObjectController.extend({
  actions: {
    deleteMarkdown: function() {
      this.get("model").deleteRecord();
      this.get("model").save();
    }
  }
});

App.ApplicationAdapter = DS.LSAdapter.extend({
  namespace: "markdownNotes"
});

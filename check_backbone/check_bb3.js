var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const dom = new JSDOM(`<!DOCTYPE html><p id="el">Hello world from DOM</p>`);
let window = dom.window;
let document = dom.window.document;
$ = jQuery = require('jquery')(window);
_ = require('underscore');
Backbone = require("backbone");
Backbone.$ = $;
Backbone._ = _;

console.log("Done!")

app = { };

app.Model1 = Backbone.Model.extend({
    defaults: {
        content: []
    },

    initialize: function() {
        console.log("Model1.initialize");
    },

    reset: function() {
        this.set('content', [], 0)
    },

    front: function() {
        let content = this.get('content');
        let i = content.length;
        content.unshift(i);
        this.set('content', content, i);
        this.trigger('change:content', this);

        console.log(i)
    },

});

app.Model2 = Backbone.Model.extend({
    defaults: {

    },

    initialize: function() {
        console.log("Model2.initialize");
        this.listenTo(app.m1, 'change:content', this.onChangeContent);
    },

    onChangeContent: function(model, arg) {
        console.log(`callback ${app.m1.get('content')}`);
    },

});


app.m1 = new app.Model1({
});
app.m2 = new app.Model2({
});


app.m1.front();
app.m1.front();
app.m1.reset();
app.m1.front();
app.m1.front();


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
        title: "Model1",
        message: "Hello Cruel World",
        index: 0
    },

    initialize: function() {
        let title = this.get("title");
        console.log(`${title}.initialize: ${this.get('message')}`);
    }

});

app.Model2 = Backbone.Model.extend({
    defaults: {
        title: "Model2",
        message: "Hello Happy World",
    },

    initialize: function() {
        let title = this.get("title");
        console.log(`${title}.initialize: ${this.get('message')}`);

        this.listenTo(app.m1, 'change:message', this.onChangeMessage);
        this.listenTo(app.m1, 'change:index', this.onChangeIndex);
    },

    onChangeMessage: function(model, arg) {
        console.log(`Model2.onChangeMessage ${app.m1.get('message')}`);
        console.log(`Model2.onChangeMessage ${model.get('message')}`);
        console.log(model);
        console.log(arg);
    },

    onChangeIndex: function(model, arg) {
        console.log(`Model2.onChangeIndex ${model.get('index')}`);
    }

});


app.m1 = new app.Model1({
    title: "M1",
});
app.m2 = new app.Model2({
    title: "M2",
});

app.m1.set('message', "Ciao Ciccio");
app.m1.set('index', 1);
app.m1.set('index', 0);
app.m1.set('index', 0, {});



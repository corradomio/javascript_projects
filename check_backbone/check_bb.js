var jsdom = require("jsdom");

const { JSDOM } = jsdom;
const dom = new JSDOM(`<!DOCTYPE html><p id="el">Hello world from DOM</p>`);

// const { window } = dom;
// const { document } = window;

// window & document MUST BE local (let) & global (global.*)
let window = dom.window;
let document = dom.window.document;
// global.windows = window;
// global.document = document;

$ = jQuery = require('jquery')(window);
_ = require('underscore');
Backbone = require("backbone");
Backbone.$ = $;
Backbone._ = _;

console.log("Done!")
// console.log(global);
//
// $ = require("jquery");
// _ = require("underscore");
// Backbone = require("backbone");
//
// const jsdom = require("jsdom");
// const { JSDOM } = jsdom;
// const dom = new JSDOM(`<!DOCTYPE html><p id="el">Hello world from DOM</p>`);
//
// window = dom.window;
// document = window.document;

app = {};

// let document = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);

app.Model1 = Backbone.Model.extend({
    defaults: {
        title: "Model1",
        message: "Hello Cruel World"
    },

    initialize: function() {
        let title = this.get("title");
        console.log(`${title}.initialize: ${this.get('message')}`);
    }

});

app.Model2 = Backbone.Model.extend({
    defaults: {
        title: "Model2",
        message: "Hello Happy World"
    },

    initialize: function() {
        let title = this.get("title");
        console.log(`${title}.initialize: ${this.get('message')}`);

        this.listenTo(app.m1, 'change:message', this.onM1ChangeMessage);
    },

    onM1ChangeMessage: function(model, args) {
        console.log("Model2.onM1ChangeMessage")
    }

});

app.m1 = new app.Model1({
    title: "M1",
});
app.m2 = new app.Model2({
    title: "M2",
});


app.View = Backbone.View.extend(({
    el: '#el',

    initialize: function() {
        this.listenTo(this.model, 'change', this.onChange);
    },

    onChange: function(model, args) {
        let title = this.model.get("title")
        console.log(`${title}.View.onChange`);
        if (model.changed.message !== null) {
            console.log("... changed message");
            console.log(args);
        }
    }
}));


app.v1 = new app.View({
    model: app.m1,
});
app.v2 = new app.View({
    model: app.m2
});

app.m1.set('message', "Ma dai che forse funziona!");

console.log("done");

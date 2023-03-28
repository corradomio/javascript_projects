// require('backbone')

var IPredict = {};
var App = {};


console.log('before1');
console.log($('#datasources').text());
// --------------------------------------------------------------------------
// App
// --------------------------------------------------------------------------

IPredict.App = Backbone.Model.extend({
    defaults: {
        title: 'App',
        home: 'http://localhost:5000/ipredict'
    },
    initialize: function() {
        // console.log('App.initialize');
        // let url = new URL(window.location);
        // console.log(url);
        this.home = this.get('home')
    },
});


var app = new IPredict.App();


// --------------------------------------------------------------------------
// Models
// --------------------------------------------------------------------------

IPredict.DataSource = BackboneHal.Model.extend({
    initialize: function() {
        BackboneHal.Model.prototype.initialize(this);
        // console.log('DataSource.initialize');
        // console.log(this);
    },
});


IPredict.Datasources = BackboneHal.Collection.extend({
    model: IPredict.DataSource,
    url: app.home + '/datasources',

    initialize: function() {
        BackboneHal.Collection.prototype.initialize();
        // console.log('Ext.Collection.initialize');
    }
});


// --------------------------------------------------------------------------
// Viewes
// --------------------------------------------------------------------------

IPredict.DatasourceView = Backbone.View.extend({

});


IPredict.DatasourcesView = Backbone.View.extend({
    el: '#datasources',
    // tagName: 'ol',

    initialize: function() {
        console.log('created DatasourcesView');
        console.log(this.$el.text());

        this.render();
    },

    render: function() {
        console.log('render3');
        this.$el.replaceWith('<div>ciccio3</div>');
        // $('#datasources').replaceWith('<div>ciccio</div>');
        // $('#datasources').replaceWith('<div>ciccio</div>');
        console.log($('#datasources').text());
    }
});


// --------------------------------------------------------------------------
// App/Models/Views instance
// --------------------------------------------------------------------------

app.models = {}
app.views = {};

app.models.datasources = new IPredict.Datasources();
app.models.datasources.fetch();

// app.views.datasources = new IPredict.DatasourcesView({
//     el: $('#datasources'),
//     model: app.models.datasources
// });

// app.views.datasources = new IPredict.DatasourcesView({
//     // el: $('#datasources'),
//     model: app.models.datasources
// });

// --------------------------------------------------------------------------
//
// --------------------------------------------------------------------------



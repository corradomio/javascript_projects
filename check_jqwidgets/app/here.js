console.log('in script');

console.log($('#here').text());
console.log($('#there').text());


var View = Backbone.View.extend({
    el: '#there',

    initialize: function() {
        console.log('initialize');
        this.render();
    },

    render: function() {
        console.log('in render');
        // console.log($('#there').text());
        console.log(this.$el.text());

        this.$el.replaceWith('Ciccio');
    }
});

var view = new View({});

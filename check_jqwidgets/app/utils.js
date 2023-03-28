


/*
    datasource:
    {
        "content": [
            {
                "name": "kaggle",
                "type": "filesystem",
                "url": "http://localhost:5000/ipredict/datasources/kaggle"
            },
            ...
        ],
        "links": [
            {
                "rel": "self",
                "href": "http://localhost:5000/ipredict/datasources"
            },
            {
                "rel": "kaggle",
                "href": "http://localhost:5000/ipredict/datasources/kaggle"
            },
            ...
        ]
    }

    source used in jqxtree:

        label - sets the item's label.
        value - sets the item's value.
        html - item's html. The html to be displayed in the item.
        id - sets the item's id.
        disabled - sets whether the item is enabled/disabled.
        checked - sets whether the item is checked/unchecked(when checkboxes are enabled).
        expanded - sets whether the item is expanded or collapsed.
        selected - sets whether the item is selected.
        items - sets an array of sub items.
        icon - sets the item's icon(url is expected).
        iconsize - sets the size of the item's icon.

 */

function datasources_to_jqxtree_source(data) {
    let content = data.content;
    return _.map(content, (ds) => ({
        id: ds.name,
        label: ds.name,
        value: ds,
        expanded: true,
        items: []
    }))
}


/*
    {
        "content": {
            "name": "kaggle",
            "type": "filesystem",
            "config": {
                "url": "file:///D:/Dropbox/Datasets/kaggle",
                "recursive": true
            },
            "sources": [
                {
                    "name": "Advertising-1.csv",
                    "url": "http://localhost:5000/ipredict/datasources/kaggle/Advertising-1.csv"
                },
                ...
            ]
        },
        "links": [
            {
                "rel": "self",
                "href": "http://localhost:5000/ipredict/datasources/kaggle"
            },
            {
                "rel": "Advertising-1.csv",
                "href": "http://localhost:5000/ipredict/datasources/kaggle/Advertising-1.csv"
            },
            ...
        ]
    }
 */
function sources_to_jqxtree_source(data) {
    // console.log(data.content);
    let content = data.content.sources;
    // console.log(content);
    return _.map(content, (src) => ({
        id: src.name,
        label: src.name,
        value: src,
        expanded: false
    }))
}





function load_datasources(url, $, dsTree) {
    console.log("load_datasources ...")

    var datasources = null;

    $.ajax({
        async: false,
        url: url,
        success: function (data, status, xhr) {
            // console.log(data.content);
            // source = jQuery.parseJSON(data.content);
            datasources = datasources_to_jqxtree_source(data);
        }
    });

    _.each(datasources, (ds)=>{
        ds_url = ds.value.url;

        $.ajax({
            async: false,
            url: ds_url,
            success: function (data, status, xhr) {
                // console.log(ds);
                ds.items = sources_to_jqxtree_source(data);
                // ds.items = sources
            }
        });
    });

    // console.log("... end ...");
    // console.log(datasources);

    dsTree.jqxTree({ source: datasources });
    // return datasources
}


function getWidth(document) {
    return Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
    );
}

function getHeight(document) {
    return Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.documentElement.clientHeight
    );
}

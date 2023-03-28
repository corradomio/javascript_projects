
var jqxlayoutDyn = {};

jqxlayoutDyn.clone = function(layout) {
    return structuredClone(layout);
}


jqxlayoutDyn.layoutGroup = function(layout, width, height) {
    // console.log({
    //     t: layout.type,
    //     o: layout.orientation,
    //     l: layout.title,
    //     w: width,
    //     h: height,
    //     lw: layout.width,
    //     lh: layout.height
    // });

    let orientation = layout.orientation;
    if (orientation == null) orientation = 'vertical';

    let dynwidth  = jqxlayoutDyn.width( layout, width);
    let dynheight = jqxlayoutDyn.height(layout, height);

    jqxlayoutDyn.items(layout.items, orientation, dynwidth, dynheight);
}


jqxlayoutDyn.commonGroup = function(layout, width, height) {
    // console.log({
    //     t: layout.type,
    //     l: layout.title,
    //     w: width,
    //     h: height,
    //     lw: layout.width,
    //     lh: layout.height
    // });

    let dynwidth  = jqxlayoutDyn.width( layout, width);
    let dynheight = jqxlayoutDyn.height(layout, height);

    jqxlayoutDyn.items(layout.items, null, dynwidth, dynheight);
}


jqxlayoutDyn.item = function(layout, width, height) {
    // console.log({
    //     type: 'item',
    //     width: width,
    //     height: height,
    // });

    let type = layout.type;

    if (type === 'layoutGroup') {
        jqxlayoutDyn.layoutGroup(layout, width, height)
    }
    // else if (type === 'tabbedGroup') {
    //     jqxlayoutDyn.commonGroup(layout, width, height)
    // }
    // else if (type === 'documentGroup') {
    //     jqxlayoutDyn.commonGroup(layout, width, height)
    // }
    // else if (type === 'autoHideGroup') {
    //     jqxlayoutDyn.commonGroup(layout, width, height)
    // }
    // else if (type === 'layoutPanel') {
    //     jqxlayoutDyn.commonGroup(layout, width, height)
    // }
    // else if (type === 'documentPanel') {
    //     jqxlayoutDyn.commonGroup(layout, width, height)
    // }
    else {
        // none
        jqxlayoutDyn.commonGroup(layout, width, height)
    }
}

jqxlayoutDyn.items = function(items, orientation, width, height) {
    // distribute [width, height] to the items in the specified orientation
    //
    // orientation:
    //      'horizontal'    items distributed horizontally
    //      'vertical'      items distributed vertically
    //      null            items share the same place
    //
    // console.log({
    //     type: 'items',
    //     width: width,
    //     height: height,
    // });

    let fixedWidth = 0;
    let fixedHeight = 0;

    if (items == null) return;

    if (orientation === 'horizontal')
        fixedWidth = jqxlayoutDyn.fixedSize(items, true);
    if (orientation === 'vertical')
        fixedHeight = jqxlayoutDyn.fixedSize(items, false);

    let availableWidth  = width-fixedWidth;
    let availableHeight = height-fixedHeight;

    items.forEach((item) => {
        jqxlayoutDyn.item(item, availableWidth, availableHeight);
    });
}

// --------------------------------------------------------------------------

jqxlayoutDyn.fixedSize = function(items, horizontal) {
    // scan items and compute the fixed size in the specified orientation
    let fixedSize = 0;
    let size = 0;

    items.forEach((item)=> {
        if (horizontal)
            size = item.width;
        else
            size = item.height;
        if (typeof size === 'number') {
            fixedSize += size
        }
    });

    return fixedSize;
}

jqxlayoutDyn.dynSize = function(whatSize, minSize, availableSize) {
    // Syntax:
    //       77
    //      '77'    '77%'
    //      '77-4'  '77+4'
    //      '77%-4' '77%+4'
    //
    // whatSize:
    //      if it is null, return available size
    //      if it is a number, return the number
    //      if it is a string like a number ('33'), return the number
    //      if it is a percent ('33%'), return the percent of available size
    //
    // availableSize:
    //      if it is <= 0, return 0
    let pos = 0;
    let border = 0;
    let percent = 0;
    let origSize = whatSize;

    if (whatSize == null)
        return null;
    if (typeof whatSize === 'number')
        return whatSize;

    if (minSize == null)
        minSize = 0;

    // 1) '77-4'  '77%-4'
    // 2) '77'    '77%'
    if (typeof whatSize === 'string') {
        // 1)
        pos = whatSize.indexOf('-');
        if (pos > 0) {
            border = -Number(whatSize.substring(pos+1));
            whatSize = whatSize.substring(0, pos);
        }
        pos = whatSize.indexOf('+');
        if (pos > 0) {
            border = +Number(whatSize.substring(pos+1));
            whatSize = whatSize.substring(0, pos);
        }
        // 2)
        pos = whatSize.indexOf('%');
        if (pos > 0) {
            percent = Number(whatSize.substring(0, pos));
            whatSize = ((percent*availableSize)/100 >> 0)
        }
        else {
            whatSize = Number(whatSize);
        }

        whatSize += border;
    }

    if (whatSize <= minSize)
        whatSize = minSize;
    if (whatSize >= availableSize)
        whatSize = availableSize

    // console.log({ws: whatSize, os: origSize, ms: minSize, as: availableSize});
    return whatSize;
}

// --------------------------------------------------------------------------

jqxlayoutDyn.width = function(layout, availableWidth) {
    let width = jqxlayoutDyn.dynSize(layout.width, 0, availableWidth);
    if (width != null) {
        layout.width = width;
        return width;
    }
    return availableWidth;
}

jqxlayoutDyn.height = function(layout, availableHeight) {
    let height = jqxlayoutDyn.dynSize(layout.height, 0, availableHeight);
    if (height != null) {
        layout.height = height;
        return height;
    }
    return availableHeight;
}


// --------------------------------------------------------------------------
// jqxlayoutDyn.resize(layout, width, height)
// --------------------------------------------------------------------------

jqxlayoutDyn.resize = function(layout, width, height) {
    if (width == null || height == null) {
        width = window.innerWidth;
        height = window.innerHeight;
    }

    console.log({
        name: 'resize',
        width: width,
        height: height
    });

    let dynlayout = jqxlayoutDyn.clone(layout);

    if (Array.isArray(layout)) {
        jqxlayoutDyn.items(dynlayout, 'vertical', width, height);
    } else {
        jqxlayoutDyn.item(dynlayout, width, height);
    }

    return dynlayout;
}

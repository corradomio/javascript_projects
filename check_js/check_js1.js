function url_at(url, elt) {
    let pos = url.indexOf(elt);
    if (pos > 0)
        url = url.substring(0, pos + elt.length)
    if (!url.endsWith('/'))
        url += '/';
    return url;
}


console.log(url_at('http://localhost:5000/ipredict/ipmodels/', 'ipmodels'));

console.log(JSON.parse(" {} "));
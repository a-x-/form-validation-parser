module.exports.parse = (function(){

    var $ = require('cheerio');
    $h2 = $.load('<h2 class="title">Hello world</h2>');

    $h2('h2.title').text('Hello there!');
    $h2('h2').addClass('welcome');

    console.log($h2.html());

    return function(html) {
        var $html = $.load(html);
        return {};
    };
}());
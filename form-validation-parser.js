module.exports.parse = (function () {

    var $d = require('cheerio'),
        fs = require('fs'),
        _ = require('lodash'),
        $ = _.chain;

    _.mixin({pluckDeep: function (object, selector) {
        var pluckDeep = require('pluck-deep');
        return pluckDeep(object, selector);
    }});

    _.mixin({pluckCollection: function (array, propCollection) {

    }});

//    $h2 = $.load('<h2 class="title">Hello world</h2>');
//
//    $h2('h2.title').text('Hello there!');
//    $h2('h2').addClass('welcome');
//
//    console.log($h2.html());

//    var html = fs.readFileSync('./test.html');
    return function (html) {
        var $html = $d.load(html),
            $formsCollection = $html('form');

        var formsStructs = {};
        $formsCollection.each(function (index, form) {
            form = $d(form);
            formsStructs[form.attr('name')] = {required: {}, optional: {}};
            form.find('input').each(function (index, input) {
                input = $d(input);
                formsStructs[form.attr('name')][input.attr('required') != undefined ? 'required' : 'optional'][input.attr('name')] = (function () {
                    var out = {};
                    var type = input.attr('data-type') || input.attr('type');
                    if (type === 'text') {
                        out.pattern = input.attr('pattern');
                    }
                    else {
                        out.type = type;
                    }
                    out.sample = input.attr('title');
                    // todo check html elements with another validation parameters
                    if (/range|number/i.test(input.name)) {
                        out.params = (function () {
                        }());
                    }

                    return out;
                }());
            });
        });
        return formsStructs;
//    console.log(JSON.stringify(formsStructs));

// Try FP:
//        $formsCollection = $($html('form'));
//    console.log(JSON.stringify(
//    var raw =
//        $formsCollection
//            .toArray()
//            .pluckDeep('attribs.name')
//            .invert() // put names to keys
//            .mapValues(function(nc, name){return $formsCollection.find({attribs:{name:name}}).pick('children').valueOf();})
//            .mapValues(function(form) {
//                var omit = function(child){return _.omit(child,['parent','next','prev']);};
//                var omitRecursive = function (parent) {
//                    debugger;
//                    if(!parent) return parent;
//                    parent.children && (parent.children = _.map(parent.children, omitRecursive));
//                    return omit(parent);
//                }
//                return _.map(form.children, omitRecursive);
//            })
////            .forEach(function (form) {
////                console.log(form.children);
////            })
//            .valueOf()
////    ));
//    $(raw).forEach(function (form) {
//        console.log(_.pluck(form, 'children'));
//    });
////        return {};
////    };
////    console.log(raw);
////    console.log(JSON.stringify(raw));
    }
}());
require('string-format-js');
var $d = require('cheerio'),
    _ = require('lodash'),
    $ = _.chain;

module.exports = (function (html) {
    return new function (html) {

        this.html = '';
        this.validata = '';
        this.errors = [];
        this.options = {messages:{empty:'Field «{}» isn\'t be empty'}};
        this.templates = {
            empty: function(fieldName) {return this.options.messages.empty.format(fieldName)}.bind(this)
        };

        //
        // Extract validate rules from html forms
        this.parse = function (html, options) {
            options && (this.options = options);
            html && (this.html = html);
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
                                // todo write it...
                            }());
                        }
                        return out;
                    }());
                });
            });
            this.validata = formsStructs;
            return this;
        }.bind(this);

        //
        // Set options
        this.setOption = function (name, value) {
            this.options[name] = value;
            return this;
        }.bind(this);

        //
        // Get validation rules and exit chain
        this.rulesOf = function () {
            return this.validata;
        }.bind(this);

        //
        // Validate input data by rules
        this.validate = function (data) {
            $(data).forEach(function (value, key) {
                if ($(this.validata.required).values().contains(key)) {
                    if (!value) {
                        this.errors.push(this.templates.empty(value));
                    }
                }
                else if ($(this.validata.optional).values().contains(key)) {
                }
                else {
                    // todo bring not rulled fields actions
                }
                // todo sanitize and validate value
            })
            return this;
        }.bind(this);

    };
});


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

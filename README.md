form-validation-parser
======================

PHP parser html5 form validation declaration. Make possible basing php server-side addition validation on the already existing client-side html5 form validation declaration.


# Usage

For example, Parsing the html code

```html
...
<form name="my-data" action="...">
    <input type="text" pattern="\d{1,3}\.\d{1,3}\.\d{1,3}" data-type="ip" title="127.0.0.1" name="user_ip" />
    <input type="email" title="me@best-mail.io" name="user_email" required />
    <input type="text" pattern="#\d+" name="the-system-id" title="#312" />
    <input type="number" min="2" name="magic-foo" />
  <button >Submit</button>
</form>
...
```

return structure:

```js
{
    "my-data": {
        "required": {
            "user_email": {
                "type": "email",    // It is standart HTML5 type.
                "sample": "me@best-mail.io"
            }
        },
        
        "optional": {
            // Pattern provide base validation only ad hoc. Type definition provide full validation layer.
            "user_ip": {
                "type": "ip",         // It is not HTML5 standart type, which must be defined additionally
                "sample": "127.0.0.1"
            },
            "the-system-id": {
                "pattern": "#\d+",    // There is (full validation qualified) pattern only.
                "sample": "#312"
            },
            "magic-foo": {
                "type": "number",
                "sample": "",
                "params": {"min":2}
            }
        } // optional
    } // my-data
}
```


# Status

Idea process.

| **Idea** | Alpha | Beta | RC | Production |
|:--------:|:-----:|:----:|:--:|:----------:|
|  Pending |   —   |  —   |  — |      —     |


# Dependencies

* [Cheerio](https://github.com/cheeriojs/cheerio) for DOM parsing.
    + See about
        - [page](http://cheeriojs.github.io/cheerio/),
        - [tutorial (Russian)](http://catethysis.ru/cheerio-node-js/).
    + Another ways:
        - [xpath lib tutorial (Russian)](http://vasinnet.blogspot.ru/2013/04/nodejs-html-xml-xpath.html),
        - [htmlparser2](https://www.npmjs.org/package/htmlparser2) — HTML/XML/RSS parser **for Node.js**,
        - [node-htmlparser](https://github.com/tautologistics/node-htmlparser) — HTML/XML/RSS parser written in JS for **both the browser and NodeJS**.
        - [dom parsers benchmarks](http://habrahabr.ru/post/163979/).
        - [question on stackoverflow](http://stackoverflow.com/questions/7372972/how-do-i-parse-a-html-page-with-node-js).

# Demo

# TODO

* Make possible parsing array form items such as: `user[email]`, `user[name]`, `user[address][street]`, etc.`
* Implement polymorphic endpoints.
* Check for identity default value for disabled and hiden fields. Add no strict mode for ignoring this checking.

# License

All under MIT license.

# Contribution

You're welcome!
I watch github issues and mailbox (me@invntrm.ru).

English typo-fixes are welcome too.

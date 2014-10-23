/**
 * @file AB-STORE /
 * Created: 10.09.14 / 0:29
 */
var
    fs = require('fs'),
    Parser = require('./form-validation-parser'),
    html = fs.readFileSync('sample.html'),
    parser = Parser(html).parse
    ;

console.log(JSON.stringify(parser()));
/*
 ->
 {"my-data":{
    "required":{"user_email":{"type":"email","sample":"me@best-mail.io"}},
    "optional":{
        "user_ip":{"type":"ip","sample":"127.0.0.1"},
        "the-system-id":{"pattern":"#\\d+","sample":"#312"},
        "magic-foo":{"type":"number"}}}}
 */
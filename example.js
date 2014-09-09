/**
 * @file AB-STORE /
 * Created: 10.09.14 / 0:29
 */
var
    fs = require('fs'),
    parser = require('./form-validation-parser').parse;

var html = fs.readFileSync('sample.html');

console.log(JSON.stringify(parser(html)));
/*
 ->
 {"my-data":{
    "required":{"user_email":{"type":"email","sample":"me@best-mail.io"}},
    "optional":{
        "user_ip":{"type":"ip","sample":"127.0.0.1"},
        "the-system-id":{"pattern":"#\\d+","sample":"#312"},
        "magic-foo":{"type":"number"}}}}
 */
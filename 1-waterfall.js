/* 
  #####################################################################
  ##                        ~~  WATERFALL  ~~                        ##
  #####################################################################

In Node.js and browsers there are three ways to do asynchronous JavaScript.

The first way leads to what we call Callback Hell. Callback Hell
can be minimized by following the tips at http://callbackhell.com.

Another method is to use a Promise package. Using promises will simplify your
code but it also adds another layer of abstraction.

The last method is by using the async package by Caolan McMahon.  With async
we are still writing callbacks but without falling into the callback hell or
adding another layer of abstraction with promises.

More often than not you will need to do multiple asynchronous calls one after
the other with each call dependent on the result of previous asynchronous call.
We can do this with the help of async.waterfall.

For example the following code will do a GET request to http://localhost:3131
in the first waterfall function . The response body is passed as an argument to
the next waterfall function  via the callback. The second function  in the waterfall
accepts the body as a parameter and JSON.parse's it to get to the port
property then it does another GET request.

    var http = require('http')
      , async = require('async');

    async.waterfall([
      function (cb){
        var body = '';

        // response is JSON encoded object like the following {port: 3132}
        http.get("http://localhost:3131", function (res){

          res.on('data', function (chunk){
            body += chunk.toString();
          });

          res.on('end', function (){
            cb(null, body);
          });
        }).on('error', function (err) {
          cb(err);
        });
      },

      function (body, cb){
        var port = JSON.parse(body).port;

        var body = '';

        http.get("http://localhost:" + port, function (res){
          res.on('data', function (chunk){
            body += chunk.toString();
          });

          res.on('end', function (){
            cb(null, body);
          });

        }).on('error', function (err) {
          cb(err);
        });
      }
    ], function (err, result){
      if (err) return console.error(err);
      console.log(result);
    });



In this problem you will need to write a program that first reads the contents of a file.
The path will be provided as the first command-line argument to your program.
The file will contain a single URL. Using `http.get`, create a GET request to this url
and console.log the response body.

*/	

var http = require('http'),
	fs = require('fs'),  
	async = require('async');

async.waterfall([

	function (cb) {
		fs.readFile(process.argv[2], 'utf8', function (err, url) {
			if (err) {
				cb(err);
			}
			cb(null, url);
		}); 
	}, 

	function (url, cb) {
		var body = '';

		http.get(url, function (res) {
			
			res.on('data', function (chunk) {
				body += chunk.toString();
			}); 

			res.on('end', function () {
				cb(null, body);
			});
			
      res.on('error', function (err) {
				cb(err);
			});
		
    });
	}
], 

function (err, result) {
	if (err) {
		console.log(err);
	}
	console.log(result);
});	

/* 
Verifying "WATERFALL"...

ACTUAL:   "boom!"
EXPECTED: "boom!"

ACTUAL:   ""
EXPECTED: ""

# PASS

Your solution to WATERFALL passed!

Here's what the official solution is if you want to compare notes:

-----------------------------------------------------------------


      var fs = require('fs')
        , http = require('http')
        , async = require('async');
    
      async.waterfall([
        function(done){
          fs.readFile(process.argv[2], function(err, data){
            if (err) return done(err);
            done(null, data)
          });
        },
    
        function(data, done){
          var body = '';
          http.get(data.toString().trimRight(), function(res){
            res.on('data', function(chunk){
              body += chunk.toString();
            });
    
            res.on('end', function(chunk){
              done(null, body);
            });
          }).on('error', function(e){
            done(e);
          });
        }
      ], function(err, result){
        if (err) return console.error(err);
        console.log(result);
      });


-----------------------------------------------------------------

*/
/* 
  #####################################################################
  ##                           ~~  MAP  ~~                           ##
  #####################################################################

With async.each, the results of the asynchronous function are
lost.

This is where async.map comes in. It does the same thing as
async.each, by calling an asynchronous iterator function on
an array, but collects the results of the asynchronous iterator function 
and passes them to the results callback. The results are in an array that is 
in the same order as the original array.

For example, the example in the EACH problem can be written as:

    var http = require('http')
      , async = require('async');

    async.map(['cat', 'meerkat', 'penguin'], function(item, done){
      var opts = {
        hostname: 'http://httpbin.org',
        path: '/post',
        method: 'POST'
      };
      var body = '';
      var req = http.request(opts, function(res){
        res.on('data', function(chunk){
          body += chunk.toString();
        });

        res.on('end', function(){
         return done(null, body);
        });
      });

      req.write(item);
      req.end();
    },
    function(err, results){
      if (err) return console.log(err);
      // results is an array of the response bodies in the same order
    });

Write a program that will receive two command-line arguments to two URLs.
Using http.get create two GET requests to these URLs.
You will need to use async.map and console.log the
results array.

*/

// var async = require('async'), 
// 	http = require('http'), 
// 	args = process.argv, 
// 	urls = [args[2], args[3]];

// console.log(process.argv);

/* 
THIS WORKSHOP SUFFERS FROM THE SAME PROBLEM AS 3-EACH...THERE'S A 
NASTY BUG.  CAN'T EVEN LOG THE ARGS PASSED TO THE TEST.
*/

var async = require('async'), 
	http = require('http'), 
	urls = [process.argv[2], process.argv[3]]; 

async.map(urls, 
	function (url, cb) {
		var req = http.get(url, function (res) {
			var body = ""; 

			res.on('data', function (chunk) {
				body += chunk; 
			}); 

			res.on('end', function () {
				cb(null, body); 
			});
		}); 

		req.on('error', function (err) {
			cb(err); 
		}); 

		req.end(); 
	}, 

	function (err, result) {
		if (err) {
			console.log(err); 
			return;
		}

		console.log(result);
	});

/* 
Figured it out with ease.  These lessons are much easier after all of 
the async module use I put into ShopScraper. 

Verifying "MAP"...

ACTUAL:   "[ 'one is smaller than 2', 'two greater than one' ]"
EXPECTED: "[ 'one is smaller than 2', 'two greater than one' ]"

ACTUAL:   ""
EXPECTED: ""

# PASS

Your solution to MAP passed!

Here's what the official solution is if you want to compare notes:

-----------------------------------------------------------------


      var http = require('http')
        , async = require('async');
    
      async.map(process.argv.slice(2), function(url, done){
        var body = '';
        http.get(url, function(res){
          res.on('data', function(chunk){
            body += chunk.toString();
          });
    
          res.on('end', function(){
           return done(null, body);
          });
        });
      },
      function(err, results){
        if (err) return console.log(err);
        // results is an array of the response bodies in the same order
        console.log(results);
      });


-----------------------------------------------------------------

*/
/* 
  #####################################################################
  ##                          ~~  EACH  ~~                           ##
  #####################################################################

Occasionally you will want to call the same function multiple times, but with
different inputs, without caring about the return data but to check if any call
throws an error (sometimes not even that). This is where async.each is useful. 
For example, the following will make three calls using the values in the array:

    var http = require('http')
      , async = require('async');

    async.each(['cat', 'meerkat', 'penguin'], function(item, done){
      var opts = {
        hostname: 'http://httpbin.org',
        path: '/post',
        method: 'POST'
      };
      var req = http.request(opts, function(res){
        res.on('data', function(chunk){
        });

        res.on('end', function(){
         return done();
        });
      });

      req.write(item);
      req.end();
    },
    function(err){
      if (err) console.log(err);
    });

Create a program that will receive two URLs as the first and second command-line
arguments. Then using `http.get`, create two GET requests to these URLs and 
console.log any errors.

*/

// var async = require('async'), 
// 	http = require('http'), 
// 	args = process.argv, 
// 	urls = [args[2], args[3]];

// async.each(urls, function(url, cb) {
// 	http.get(url, function(res) {
// 		res.on('error', function(err) {
// 			cb(err);
// 		});
// 	});
// }, 
// function(err) {
// 	if (err) {
// 		console.log(err);
// 	}
// });

/* 
I THINK THIS ONE IS BUGGY...

CAN'T GET A WORKING SOLUTION, NOR CAN I GET THE VERIFY RESULTS 
TO CHANGE NO MATTER WHAT I DO.  I DON'T THINK THIS ONE IS MY FAULT.
*/

var async = require('async'), 
	http = require('http'), 
	urls = [process.argv[2], process.argv[3]]; 

async.each(urls, 
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
Nope, the lesson isn't buggy, of course.  We need to attach the error handler 
for error events onto the REQUEST object, not the response object.  

Note: We also must include return in our final callback after we log the error 
because we don't want to log a nonexistant result when an error occurs.  

Verifying "EACH"...

ACTUAL:   "{ [Error: connect ECONNREFUSED]"
EXPECTED: "{ [Error: connect ECONNREFUSED]"

ACTUAL:   "  stack: 'Error: connect ECONNREFUSED\\n    at exports._errnoException (util.js:742:11)\\n    at Object.afterConnect [as oncomplete] (net.js:989:19)',"
EXPECTED: "  stack: 'Error: connect ECONNREFUSED\\n    at exports._errnoException (util.js:742:11)\\n    at Object.afterConnect [as oncomplete] (net.js:989:19)',"

ACTUAL:   "  code: 'ECONNREFUSED',"
EXPECTED: "  code: 'ECONNREFUSED',"

ACTUAL:   "  errno: 'ECONNREFUSED',"
EXPECTED: "  errno: 'ECONNREFUSED',"

ACTUAL:   "  syscall: 'connect' }"
EXPECTED: "  syscall: 'connect' }"

ACTUAL:   ""
EXPECTED: ""

# PASS

Your solution to EACH passed!

Here's what the official solution is if you want to compare notes:

-----------------------------------------------------------------


      var http = require('http')
        , async = require('async');
    
      async.each(process.argv.slice(2), function(item, done){
        http.get(item, function(res){
          res.on('data', function(chunk){
          });
    
          res.on('end', function(){
            done(null);
          });
        }).on('error', function(err){
          done(err);
        });
      },
      function(err){
        if(err) console.log(err);
      });


-----------------------------------------------------------------

*/
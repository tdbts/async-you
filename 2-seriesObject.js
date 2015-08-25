/* 
  #####################################################################
  ##                      ~~  SERIES OBJECT  ~~                      ##
  #####################################################################

In this problem we will learn to use async.series.

The main difference between the waterfall and series functions is that the 
result from a task function in async.series won't be passed along to the next 
function once it completes. series will collect all results as an array 
and pass it to the optional callback that runs once all of the task functions 
have completed. For example:

    async.series([
      function(callback){
        setTimeout(function() {
          callback(null, 'one');
        }, 200);
      },
      function(callback){
        setTimeout(function() {
          callback(null, 'two');
        }, 100);
      }
    ],
    // optional callback
    function(err, results){
      // results is now equal to ['one', 'two']
    });

Instead of using an array as the result container async.series can use an 
object, running each property and creating a result object with the same 
properties. The above example can be written like so:

    async.series({
      one: function(done){
        done(null, '1');
      },

      two: function(done){
        done(null, '2');
      }
    }, function(err, result){
      console.log(results);
      // results will be {one: 1, two: 2}
    });

-----

Write a program that will receive two URLs as the first and second command-line arguments.
Using `http.get` create a GET request to to these urls and pass the response body to the callback.

Pass in an object of task functions, using the property names `requestOne` and 
`requestTwo`, to async.series.

console.log the results in the callback for series when all the task functions have completed.

*/

var http = require('http'), 
	async = require('async');

async.series({
	requestOne: function(cb) {
		var body = "";
		
    http.get(process.argv[2], function(res) {
			res.on('data', function(chunk) {
				body += chunk.toString(); 
			});
			
      res.on('error', function(err) {
				cb(err);
			});
			
      res.on('end', function() {
				cb(null, body);
			});
		});
	}, 

	requestTwo: function(cb) {
		var body = "";
		
    http.get(process.argv[3], function(res) {
			res.on('data', function(chunk) {
				body += chunk.toString(); 
			});
			
      res.on('error', function(err) {
				cb(err);
			});
			
      res.on('end', function() {
				cb(null, body);
			});
		});
	}
}, 

function(err, result) {
	if (err) {
		console.log(err);
	}
	console.log(result);
});

/* 
Verifying "SERIES OBJECT"...

ACTUAL:   "{ requestOne: 'one is smaller than 2',"
EXPECTED: "{ requestOne: 'one is smaller than 2',"

ACTUAL:   "  requestTwo: 'two greater than one' }"
EXPECTED: "  requestTwo: 'two greater than one' }"

ACTUAL:   ""
EXPECTED: ""

# PASS

Your solution to SERIES OBJECT passed!

Here's what the official solution is if you want to compare notes:

-----------------------------------------------------------------


      var http = require('http')
        , async = require('async');
    
      async.series({
        requestOne: function(done){
          var body = '';
          http.get(process.argv[2], function(res){
            res.on('data', function(chunk){
              body += chunk.toString();
            });
    
            res.on('end', function(chunk){
              done(null, body);
            });
          }).on('error', function(e){
            done(e);
          });
        },
        requestTwo: function(done){
          var body = '';
          http.get(process.argv[3], function(res){
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
      },
      function(err, result){
        if (err) return console.error(err);
        console.log(result);
      });

*/
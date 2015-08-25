/* 
  #####################################################################
  ##                         ~~  WHILST  ~~                          ##
  #####################################################################

Write a program that will receive a single command line argument to a URL.
Using async.whilst and http.get send GET
requests to this url until the response body contains the string meerkat

console.log the amount of GET requests needed to retrieve the meerkat string

HINTS: String.prototype.trim() is your friend.

*/

var async = require('async'), 
	http = require('http'), 
	url = process.argv[2], 
	requestCount = 0, 
	body = ""; 

async.whilst(
	function () {
		return body.indexOf("meerkat") === -1; 
	}, 
	function (callback) {
		requestCount++; 

		var req = http.get(url, function (res) {
			res.on('data', function (chunk) {
				body += chunk.toString().trim(); 
			}); 

			res.on('end', function () {
				callback(null); 
			}); 
		}); 

		req.on('error', function (err) {
			callback(err); 
		}); 
	}, 
	function (err) {
		console.log(requestCount);
	}
);

/* 
Verifying "WHILST"...

ACTUAL:   "3"
EXPECTED: "3"

ACTUAL:   ""
EXPECTED: ""

# PASS

Your solution to WHILST passed!

Here's what the official solution is if you want to compare notes:

-----------------------------------------------------------------


      var http = require('http')
        , async = require('async');
    
      var requestBody = '';
    
      var count = 0;
    
      async.whilst(
        function() {
          return !/meerkat/.test(requestBody.trim());
        },
    
        function(done){
          var body = '';
          http.get(process.argv[2], function(res){
            res.on('data', function(chunk){
              body += chunk.toString();
            });
    
            res.on('end', function(){
              ++count;
              requestBody = body;
              done();
            });
          }).on('error', done);
        },
    
        function(err){
          if (err) return console.log(err);
          console.log(count);
        }
      )


-----------------------------------------------------------------

You've finished all the challenges! Hooray!

*/
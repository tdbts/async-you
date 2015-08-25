/* 
  #####################################################################
  ##                         ~~  REDUCE  ~~                          ##
  #####################################################################

Write a program that will receive an URL as the first command line argument.
To this URL send a GET request using http.get with a query
parameter named number which should be set consecutively to one
of the values in the following array

    ['one', 'two', 'three']

Convert the response body to a Number and add it to the previous value. 
console.log the reduced value.

TIPS: use async.reduce

*/

var async = require('async'), 
	http = require('http'), 
	url = process.argv[2]; 

async.reduce(['one', 'two', 'three'], 0, function (memo, item, callback) {
	var req = http.get(url + "?number=" + item, function (res) {
		var body = ""; 

		res.on('data', function (chunk) {
			body += chunk; 
		}); 

		res.on('error', function (err) {
			console.log(err);
		});

		res.on('end', function () {
			body = parseFloat(body); 
			memo += body;  
			callback(null, memo); 
		}); 
	}); 

	req.on('error', function (err) {
		callback(err); 
	}); 
}, 

function (err, result) {
	if (err) {
		console.log(err);
		return; 
	}

	console.log(result);
}); 

/* 
Verifying "REDUCE"...

ACTUAL:   "6"
EXPECTED: "6"

ACTUAL:   ""
EXPECTED: ""

# PASS

Your solution to REDUCE passed!

Here's what the official solution is if you want to compare notes:

-----------------------------------------------------------------


      var http = require('http')
        , async = require('async');
    
      async.reduce(['one', 'two', 'three'], 0, function(memo, item, callback){
        var body = '';
    
        http.get(process.argv[2] + "?number=" + item, function(res){
          res.on('data', function(chunk){
            body += chunk.toString();
          });
    
          res.on('end', function(){
            callback(null, memo + Number(body));
          });
        }).on('error', callback);
    
      }, function(err, result){
        if (err) return console.log(err);
        console.log(result);
      });


-----------------------------------------------------------------

*/

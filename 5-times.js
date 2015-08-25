/* 
  #####################################################################
  ##                          ~~  TIMES  ~~                          ##
  #####################################################################

Write a program that will receive two command line arguments containing
the hostname and port. Using `http.request` send a POST request to

    url + '/users/create'

with the body containing a JSON.stringify'ed object;

    {user_id : 1}

Do this five times with each of the `user_id` property being incremented starting
at 1.

Once these requests are done send a GET request to 

    url + '/users'

and console.log the response body for the GET request.

HINTS: In this problem, you will need to co-ordinate a few async operations.

Use async.series for this and pass in an Object. One of the task functions will need to use async.times
to send POST requests using http.request. The other will then do the GET request.

*/

    // var http = require('http')
    //   , async = require('async');

    // async.each(['cat', 'meerkat', 'penguin'], function(item, done){
    //   var opts = {
    //     hostname: 'http://httpbin.org',
    //     path: '/post',
    //     method: 'POST'
    //   };
    //   var req = http.request(opts, function(res){
    //     res.on('data', function(chunk){
    //     });

    //     res.on('end', function(){
    //      return done();
    //     });
    //   });

    //   req.write(item);
    //   req.end();
    // },
    // function(err){
    //   if (err) console.log(err);
    // });

// var http = require('http'), 
// 	async = require('async'), 
// 	args = process.argv, 
// 	hostname = args[2],
// 	port = args[3], 
//   url = hostname + ":" + port;

// var sendPost = function(num, cb) {
// 	var opts = {
//     hostname: url, 
//     path: '/users/create', 
//     method: 'POST'
//   };
//   var req = http.request(opts, function(res) {
//     res.on('data', function(chunk) {
//     });
//     res.on('end', function() {
//       return cb();
//     });
//   });
//   var userObj = JSON.stringify({user_id: num + 1});  
//   console.log(userObj);
//   req.write(userObj);
//   req.end();
// }

// async.times(5, function(n, cb) {
//   sendPost(n, function (err, res) {
//     cb(err, res);
//   });
// }, function (err, users) {
//   http.get(url + '/users', function(res) {
//     console.log(users);
//   });
// });

// console.log(process.argv);
// // => [ '/usr/bin/nodejs',
//   '/home/tdbts/Documents/Hckr/projects/node_test/async-you/5-times.js',
//   'localhost',
//   '9345' ]


var async = require('async'), 
	http = require('http'), 
	hostname = process.argv[2], 
	port = process.argv[3], 
	postOpts = {
		hostname: hostname, 
		port: port, 
		path: '/users/create', 
		method: 'POST'
	}, 
	getOpts = {
		hostname: hostname, 
		port: port, 
		path: '/users', 
		method: 'GET'
	};

async.series({
	postRequest: function (cb) {
		async.times(5, function (n, next) {
			var req = http.request(postOpts, function (res) {
				
			}); 

			req.write(JSON.stringify({user_id: n + 1})); 
			req.end(); 
			next(); 
		}, 

		function (err, result) {
			cb(err, result); 
		}); 
	}, 

	getRequest: function (cb) {
		var req = http.get(getOpts, function (res) {
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
	}
}, 

function (err, result) {
	if (err) {
		console.log(err); 
		return; 
	}

	console.log(result.getRequest);
});

/* 
Verifying "TIMES"...

ACTUAL:   "{\"users\":[{\"user_id\":1},{\"user_id\":2},{\"user_id\":3},{\"user_id\":4},{\"user_id\":5}]}"
EXPECTED: "{\"users\":[{\"user_id\":1},{\"user_id\":2},{\"user_id\":3},{\"user_id\":4},{\"user_id\":5}]}"

ACTUAL:   ""
EXPECTED: ""

# PASS

Your solution to TIMES passed!

Here's what the official solution is if you want to compare notes:

-----------------------------------------------------------------


      var http = require('http')
        , qs = require('querystring')
        , async = require('async')
        , hostname = process.argv[2]
        , port = process.argv[3]
        , url = 'http://' +  hostname + ':' + port;
    
      async.series({
        post: function(done){
          function _addUser(user_id, cb){
    
            var postdata = JSON.stringify({'user_id': user_id}),
            opts = {
              hostname: hostname,
              port: port,
              path: '/users/create',
              method: 'POST',
              headers: {
                'Content-Length': postdata.length
              }
            };
    
            var req = http.request(opts, function(res){
              res.on('data', function(chunk){})
    
              res.on('end', function(){
                cb();
              });
            });
    
            req.on('error', cb);
    
            req.write(postdata);
            req.end();
          }
    
          async.times(5, function(n, next){
            _addUser(++n, function(err){
              next(err);
            });
          }, function(err){
            if (err) return done(err);
            done(null, 'saved');
          });
        },
    
        get: function(done){
          http.get(url + '/users', function(res){
            var body = "";
            res.on('data', function(chunk){
              body += chunk.toString();
            });
    
            res.on('end', function(){
              done(null, body);
            });
          }).on('error', done);
        }
    
      }, function(err, result){
        if (err) return console.log(err);
        console.log(result.get);
      });


-----------------------------------------------------------------

*/

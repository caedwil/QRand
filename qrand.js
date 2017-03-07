// ---
// qrand.js
// ---
// author   Daniel Stevenson
// version  1.0.0
// created  2016-08-13
// ---

// args   type (required) uint8, uint16, or hex16
//        length (required) range 1..1024
//        size (required if type=hex16) range 1..1024
//        callback (required)
function qrand(args) {
  // Validate callback (required; function).
  if (args.callback === undefined) {
    return;
  }
  // Validate type (required; uint8, uint16, or hex16).
  if (args.type === undefined) {
    args.callback(new qerror(
      'e-2001',
      'Missing argument: type is required.'
    ));
    return;
  }
  var types = [ 'uint8', 'uint16', 'hex16' ];
  var typeIsValid = false;
  for (var i = 0; i < types.length; i++) {
    if (args.type === types[i]) {
      typeIsValid = true;
      break;
    }
  }
  if (!typeIsValid) {
    args.callback(new qerror(
      'e-2002',
      'Invalid argument: type must be uint8, uint16, or hex16.'
    ));
    return;
  }
  // Validate length (required; range 1..1024).
  if (args.length === undefined) {
    args.callback(new qerror(
      'e-2001',
      'Missing argument: length is required.'
    ));
    return;
  }
  if (args.length < 1 || args.length > 1024) {
    args.callback(new qerror(
      'e-2003',
      'Value out of bounds: length must be between 1 and 1024.'
    ));
    return;
  }
  // Validate size (optional/required if type is hex16; range 1..1024).
  if (args.type === 'hex16' && args.size === undefined) {
    args.callback(new qerror(
      'e-2001',
      'Missing argument: size is required when type is hex16.'
    ));
    return;
  }
  if (args.size !== undefined && (args.size < 1 || args.size > 1024)) {
    args.callback(new qerror(
      'e-2003',
      'Value out of bounds: size must be between 1 and 1024.'
    ));
    return;
  }
  // All arguments have been judged as valid, therefore, make the
  // request.
  qrequest(args);
}

//
function qrequest(args) {
  // Create the request object.
  var req = new XMLHttpRequest();
  // Create query string.
  var query = '?length=' + args.length + '&type=' + args.type;
  if (args.size !== undefined) query += '&size=' + args.size;
  // Set response type to JSON.
  req.responseType = 'json';
  // Open and send request.
  req.open('GET', 'https://qrng.anu.edu.au/API/jsonI.php' + query);
  req.send();
  // Setup callback (if defined).
  if (args.callback !== undefined) {
    // Setup success callback.
    req.onload = function() {
      args.callback(null, req.response);
    };
    // Setup failure callback.
    req.onerror = function() {
      args.callback(new qerror('e-1001', req.response));
    };
  }
}

// Defines an error object that is returned when an error is thrown
// during any of the qrand methods.
// type     an error code (i.e. e-1011, e-9078).
// message  a message describing the error that occured.
function qerror(type, message) {
  // Explicitly lets the programmer know something went wrong.
  this.success = false;
  // An error code (i.e. e-1011, e-9078).
  this.type = type;
  // A message describing the type of error.
  this.message = message;

  return this;
}

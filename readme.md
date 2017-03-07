## QRand

QRand is a single-file JavaScript library for interfacing with ANU's quantum
random number server (which can be found here https://qrng.anu.edu.au/).

#### Usage

The library offers one main function (and two others which it uses) for
interfacing with ANU's QRNG: `qrand(...)`.

**qrand(args)**  
Retrieves a specified number of unsigned integers or hexidecimal values from
ANU's QRNG API.

| PARAMETER |   TYPE   | DESCRIPTION                                             |
| :-------: | :------: | :-----------------------------------------------------: |
| args      | [Object] | An object containing arguments to pass to the function. |

**args**  
The object passed to the `qrand()` function.

| PARAMETER |    TYPE    | DESCRIPTION                                                              |
| :-------: | :--------: | :----------------------------------------------------------------------: |
| type      | [String]   | The type of number to generate. Can be either uint8, uint16, or hex16.   |
| length    | [Number]   | How many numbers should be generated. Minimum 1, maximum 1024.           |
| size      | [Number]   | The number of hexidecimal bytes to generate (required when using hex16). |
| callback  | [Function] | The function called when numbers have been retrieved.                    |

**callback(err, res)**  
The function which is called when all numbers have been retrieved from ANU's
QRNG API.

| PARAMETER |    TYPE            | DESCRIPTION |
| :-------: | :----------------: | :---------: |
| err       | `null` or [Object] | If no error was encountered then this is null, otherwise an object containing error information is sent. |
| res       | [Object]         | An object containing the response from ANU's QRNG server. |

#### Examples

```javascript
// Generate 100 random 8-bit unsigned integers.
qrand({
  type: 'uint8',
  length: 100,
  callback: function(err, res) {
    // Error checking.
    if (err) {
      console.error(err);
      return;
    }
    // No error was thrown, do something with the response.
    // The numbers are held in res.data.
  }
});

// Generate 1024 (maximum) 3-byte hexidecimal numbers (hexidecimal
// color codes).
qrand({
  type: 'hex16',
  length: 1024,
  size: 3,
  callback: function(err, res) {
    // Do something with the result.
    // ...
  }
});
```

[Object]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
[String]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
[Number]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number
[Function]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function

function extendedEuclidean(a, b) {
    // create the steps string so we can append to it
    var q = Math.floor(a / b);
    // I don't know how to do (a, b) - (c, d) in javascript, so we'll just make some variables to help
    var x0 = 1, x1 = 0, y0 = 0, y1 = 1;
    var steps = [];


    // b will represent the remainder, we'll loop until it is 0
    while (b != 0) {
        // q represents how many times b goes into a
        q = Math.floor(a / b);
        // store a and b in temp variables so we can update them
        var tempA = a;
        var tempB = b;

        // update a and b for the next iteration
        b = a % b;
        a = tempB;

        // this is (x0, y0) - q * (x1, y1) which is how we get our "recipe card" at each step
        var tempX = x0 - q * x1;
        var tempY = y0 - q * y1;

        // update steps HTML
        steps.push(`<tr><td><span class="equation">${tempA} = ${tempB} * ${q} + ${b}</span> <span class="recipe-card"><strong>RECIPE CARD:</strong> (${x0}, ${y0}) = ${q} * (${x1}, ${y1}) + (${tempX}, ${tempY})</span></td></tr>`);

        // prepare next iteration
        x0 = x1;
        y0 = y1;
        x1 = tempX;
        y1 = tempY;
    }

    steps.push(`Final GCD is ${a}, with coefficients x = ${x0}, y = ${y0}`);
    return [a, x0, y0, steps];
}


document.getElementById('euclideanForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Grab the inputfrom the HTML form
    var a = parseInt(document.getElementById('eucA').value);
    var b = parseInt(document.getElementById('eucB').value);
    
    var [gcd, x, y, steps] = extendedEuclidean(a, b);
    var stepsHtml = steps.map(step => `<p>${step}</p>`).join('');
    document.getElementById('euclideanResult').innerHTML = `GCD: ${gcd}, x: ${x}, y: ${y}<br>Steps:<br>${stepsHtml}`;
});

/**
    1. Write n − 1 as a power of 2 times an odd number, say n − 1 = 2kd.
    2. Choose a random a.
    3. Compute ad.
    4. Square this repeatedly to compute a2d, a22 d, . . . , a2k d.
    5. If the end result is not 1, return composite.
    6. If anywhere in the chain, we see something that is not ±1 square to 1, we return composite (this is the
    surprise square root).
    7. Otherwise, return probably prime. 
*/
function millerRabinTest(n) {
        
    // add some edge cases so it stops breaking
    if (n < 2) return [false, ["n is 1, NOT PRIME"]];
    if (n === 2 || n === 3) return [true, ["n is 2 or 3, PRIME"]];
    if (n % 2 === 0) return [false, ["n is even, NOT PRIME"]];

    // get n - 1 as a power of 2 times an odd number
    var d = n - 1;
    var k = 0;


    while (d % 2 === 0) {
        k += 1;
        d = d/2;
    }
    var steps = [];
    steps.push(`n - 1 = 2^${k} * ${d}`);


    // square repeatedly a^d -> a^kd -> a^k^2d -> ...
    for (var i = 0; i < 10; i++) {
        // get a random a
        var a = Math.floor(Math.random() * (n - 3)) + 2;
        steps.push(`a = ${a}`);
        var x = powerMod(a, d, n);
        if (x === 1 || x === n - 1) continue;

        var continueLoop = false;
        for (var j = 0; j < k - 1; j++) {
            x = powerMod(x, 2, n);
            if (x === n - 1) {
                continueLoop = true;
                break;
            }
        }
        // n is composite
        if (!continueLoop) return [false, steps]; 
    }
    // n is probably prime
    return [true, steps];
}

document.getElementById('mrForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // get n from the form
    var n = parseInt(document.getElementById('mrN').value);

    // Run the Miller-Rabin test and display the result
    var [isPrime, steps] = millerRabinTest(n);
    var stepsHtml = steps.map(step => `<p>${step}</p>`).join('');
    document.getElementById('mrResult').innerHTML = `Primality of ${n}: ${isPrime}${stepsHtml}`;
});

document.getElementById('rsaForm').addEventListener('submit', function(e) {
    e.preventDefault();

    var steps =[]
    // get p and q from the form to calculate their next primes
    var p = parseInt(document.getElementById('rsaP').value);
    var q = parseInt(document.getElementById('rsaQ').value);
    var message = parseInt(document.getElementById('rsaMessage').value);

    // use the miller rabin to get the next prime
    while (millerRabinTest(p)[0] === false) {
        p++;
    }
    while (millerRabinTest(q)[0] === false) {
        q++
    }
    steps.push(`p = ${p}, q = ${q}`);

    // calculate n and phi(n)
    var n = p * q;
    var phi = (p - 1) * (q - 1);
    steps.push(`n = ${n}, phi(n) = ${phi}`);

    // pick a random exponent in the range 1 < e < phi(n) that is coprime to phi(n)
    var e = 2;
    while (extendedEuclidean(e, phi)[0] !== 1) e++;
    steps.push(`e = ${e}`);
    
    // get inverse using extended euclidean
    var [gcd, d, y] = extendedEuclidean(e, phi);

    // calculate d, the modular inverse of e
    var d = extendedEuclidean(e, phi)[1];
    // check positive
    if (d < 0) d += phi;
    steps.push(`d = ${d}`);
    steps.push(`Bob's public key is (${n}, ${e}). Alice can use these to encrypt her message by computing m^e mod n`);

    var encryptedMessage = powerMod(message, e, n);
    steps.push(`Alice's encrypted message is ${encryptedMessage}. Now, Bob can decrypt it by computing ${encryptedMessage}^d mod ${n}`);

    var decryptedMessage = powerMod(encryptedMessage, d, n);
    steps.push(`Bob's decrypted message is ${decryptedMessage}`);


    // get the message and encrypt it
    var stepsHtml = steps.map(step => `<p>${step}</p>`).join('');
    document.getElementById('rsaResult').innerHTML = `<br>Steps:<br>${stepsHtml}`;
});

// helper function for a^kd mod n calculations
function powerMod(base, exponent, modulus) {
    var result = 1;
    base = base % modulus;
    while (exponent > 0) {
        if (exponent % 2 === 1)
            result = (result * base) % modulus;
        exponent = Math.floor(exponent / 2);
        base = (base * base) % modulus;
    }
    return result;
}


document.getElementById('pollardForm').addEventListener('submit', function(e) {
    e.preventDefault();

    var n = parseInt(document.getElementById('prN').value);

    
    function pollardRho(n) {
        // initialize the turle and hare sequences
        var turtleSequence = [2];
        var hareSequence = [2];
        var steps = [];

        // we'll use f(x) = x^2 + 1
        function f(x) {
            return (x * x + 1) % n;
        }

        // generate the turtle sequence
        for (var i = 0; i < 10; i++) {
            turtleSequence.push(f(turtleSequence[i]));
        }

        steps.push(`Turtle sequence: ${turtleSequence}`);
        
        // generate the hare sequence
        for (var i = 0; i < 10; i++) {
            hareSequence.push(f(f(hareSequence[i])));
        }
        steps.push(`Hare sequence: ${hareSequence}`);

        // take the difference of the two sequences and find the gcd with n
        var diff = [];
        for (var i = 0; i < 10; i++) {
            diff.push(Math.abs(turtleSequence[i] - hareSequence[i]));
        }
        steps.push(`Difference sequence: ${diff}`);

        var gcd = 1;
        // find the gcd of the differences
        for (var i = 0; i < diff.length; i++) {
            gcd = extendedEuclidean(diff[i], n)[0];
            if (gcd != 1) break;
        }
        steps.push(`GCD of differences: ${gcd}`);

        var stepsHtml = steps.map(step => `<p>${step}</p>`).join('');
        document.getElementById('prResult').innerHTML = `<br>Steps:<br>${stepsHtml}`;


    }

    pollardRho(n);
    

});

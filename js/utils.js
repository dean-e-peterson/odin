"use strict"; // Remove if this becomes an ES6 module.

// https://stackoverflow.com/a/5450113/8491301
function repeat(pattern, count)
{
    if (count < 1) return '';
    var result = '';
    while (count > 1)
    {
        if (count & 1) result += pattern;
        count >>= 1, pattern += pattern;
    }
    return result + pattern;
}

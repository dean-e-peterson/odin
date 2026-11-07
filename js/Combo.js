// Class to hold a combination of numbers which can represent 
// the locations of tick marks on a ruler.

function Combo(bits) {
    if (!new.target)
    {
        throw Error("You must use the 'new' operator to call a constructor.");
    }

    this.bits = bits;

    // this.isComplete = function(length) {
    //     let result = true
    //     for (let i = 1; i <= length; i++)
    //     {
    //         result = result && ((this.bits & (this.bits << i)) > 0);
    //         // console.log(`result: ${result}, this.bits: ${this.bits}, this.bits << ${i}: ${this.bits << i}`);
    //     }
    //     return result;
    // }

    this.toArray = function() {
        let bits = this.bits;
        let results = [];
        let value = 0
        while (bits > 0)
        {
            if (bits & 1 > 0)
            {
                results.push(value);
            }
            bits = bits >>> 1;
            value++;
        }
        return results;
    }

    this.toString = function(length)
    {
        let result = "";
        let value = 0;
        const combo = this.toArray()
        for (let i = 0; i < combo.length; i++)
        {
            value = combo[i];
            result += repeat(" ", value - result.length);
            result += ".";
        }
        result += repeat(" ", length - value);
        return result;
    }

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
}
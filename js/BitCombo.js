// Class to hold a combination of numbers which can represent 
// the locations of tick marks on a ruler.

function BitCombo(bits) {
    if (!new.target)
    {
        throw Error("You must use the 'new' operator to call a constructor.");
    }

    this.bits = bits;

    this.combo = function() {
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

    this.isComplete = function(length) {
        let result = true
        for (let i = 1; i <= length; i++)
        {
            result = result && ((this.bits & (this.bits << i)) > 0);
            // console.log(`result: ${result}, this.bits: ${this.bits}, this.bits << ${i}: ${this.bits << i}`);
        }
        return result;
    }

    this.toString = function(length)
    {
        let result = "";
        let value = 0;
        const combo = this.combo()
        for (let i = 0; i < combo.length; i++)
        {
            value = combo[i];
            result += repeat(" ", value - result.length);
            result += ".";
        }
        result += repeat(" ", length - value);
        return result;
    }
}
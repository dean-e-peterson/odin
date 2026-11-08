// Class to hold a combination of numbers which can represent 
// the locations of tick marks on a ruler.

class Combo {
    constructor(bits)
    {
        this.bits = bits;
    }

    toArray() {
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

    toString(length)
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
}

// Class to hold a combination of numbers which can represent 
// the locations of tick marks on a ruler with normal JavaScript Number.

class ComboBigInt {
    constructor(bits)
    {
        if (typeof bits !== "bigint")
        {
            throw new Error("ComboBitInt constructor parameter bits is not a bigint.");
        }
        this.bits = bits;
    }

    toArray() {
        let bits = this.bits;
        let results = [];
        let value = 0
        while (bits > 0)
        {
            if ((bits & 1n) > 0n)
            {
                results.push(value);
            }
            bits = bits >> 1n;
            value++;
        }
        return results;
    }

    // TODO: If this remains unchanged from ComboInt.js, perhaps inherit from common parent?
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

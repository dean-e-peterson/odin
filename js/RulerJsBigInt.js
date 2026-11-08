// Class to hold a complete sparse ruler finding implementation based on normal JavaScript Numbers.
class RulerJsBigInt {
    constructor(length, tickCount)
    {
        this.length = length;
        this.tickCount = tickCount;
    }

    // Defer converting bits to an object until here after we've already
    // narrowed down the list to complete ones for performance.
    * generateCompleteCombos()
    {
        yield* this.generateCompleteBitCombos().map(b => new ComboBigInt(b));
    }

    * generateCompleteBitCombos()
    {
        const gen = this.generateBitCombos();
        let genNext = gen.next();
        while (!genNext.done)
        {
            if (this.isCompleteBitCombo(genNext.value))
            {
                yield genNext.value
            }
            genNext = gen.next();
        }
    }

    isCompleteBitCombo(bitCombo)
    {
        let result = true
        for (let i = 1; i <= this.length; i++)
        {
            result = result && ((bitCombo & (bitCombo << BigInt(i))) > 0);
            // console.log(`result: ${result}, bitCombo: ${bitCombo}, bitCombo << ${i}: ${bitCombo << BigInt(i)}`);
        }
        return result;
    }

    * generateBitCombos()
    {
        let bitCombo = (1n << BigInt(this.tickCount)) - 1n;
        const overflow = 1n << (BigInt(this.length) + 1n);
        while (bitCombo < overflow)
        {
            yield bitCombo;
            bitCombo = this.next(bitCombo);
        }
    }

    // Return next integer with same number of one bits using Gosper's hack
    // https://iamkate.com/code/hakmem-item-175/
    next(n) {
        let lowestBit   = n & -n
        let leftBits    = n + lowestBit
        let changedBits = n ^ leftBits
        let rightBits   = (changedBits / lowestBit) >> 2n // Will change from >>> for BigInt break Gosper's hack?
        return (leftBits | rightBits)
    }

}
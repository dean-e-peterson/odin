// Class to hold a complete sparse ruler finding implementation based on normal JavaScript Numbers.
class RulerJsInt {
    constructor(length, tickCount)
    {
        this.length = length;
        this.tickCount = tickCount;
    }

    // Defer converting bits to an object until here after we've already
    // narrowed down the list to complete ones for performance.
    * generateCompleteCombos()
    {
        yield* generateCompleteBitCombos().map(b => new Combo(b));
    }

    * generateCompleteBitCombos()
    {
        const gen = generateBitCombos();
        let genNext = gen.next();
        while (!genNext.done)
        {
            if (isCompleteBitCombo(genNext.value))
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
            result = result && ((bitCombo & (bitCombo << i)) > 0);
            // console.log(`result: ${result}, bitCombo: ${bitCombo}, bitCombo << ${i}: ${bitCombo << i}`);
        }
        return result;
    }

    * generateBitCombos()
    {
        let bitCombo = (1 << this.tickCount) - 1;
        const overflow = 1 << (this.length + 1);
        while (bitCombo < overflow)
        {
            yield bitCombo;
            bitCombo = next(bitCombo);
        }
    }

    // Return next integer with same number of one bits using Gosper's hack
    // https://iamkate.com/code/hakmem-item-175/
    next(n) {
        let lowestBit   = n & -n
        let leftBits    = n + lowestBit
        let changedBits = n ^ leftBits
        let rightBits   = (changedBits / lowestBit) >>> 2
        return (leftBits | rightBits)
    }
}
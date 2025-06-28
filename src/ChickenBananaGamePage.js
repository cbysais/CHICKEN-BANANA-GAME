function createBalancedRandomIntegers(numberOfSquares) {
    // Returns an array of randomly shuffled integers between 0 and 1.

    // numberOfSquares must be even.
    const zeroes = Array(numberOfSquares / 2).fill(0)
    const ones = Array(numberOfSquares / 2).fill(1)

    const balancedIntegers = zeroes.concat(ones)

    // Schwartzian transform JavaScript implementation from https://stackoverflow.com/a/46545530
    const balancedRandomIntegers = balancedIntegers
        .map((integer) => {
            return { integer, randomValue: Math.random() }
        })
        .sort((a, b) => {
            return a.randomValue - b.randomValue
        })
        .map(({ integer }) => {
            return integer
        })

    return balancedRandomIntegers
}

function ChickenBananaGamePage() {
    // inputtedNumberOfSquares must be even.
    const inputtedNumberOfSquares = 6 * 6
    // numberOfSquares is created as a fail-safe for odd inputtedNumberOfSquares.
    const numberOfSquares = Math.floor(inputtedNumberOfSquares / 2) * 2
    const balancedRandomIntegers = createBalancedRandomIntegers(numberOfSquares)

    return <></>
}

export default ChickenBananaGamePage

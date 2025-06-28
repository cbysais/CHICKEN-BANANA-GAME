import { useState } from 'react'

import { ReactComponent as ChickenSVG } from './chicken.svg'
import { ReactComponent as BananaSVG } from './banana.svg'

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

function Square({ integer, index, onClick }) {
    const [clicked, setClicked] = useState(false)

    return (
        <button
            className={`size-24 rounded-2xl p-2 py-2 shadow-2xl ${clicked ? (integer === 0 ? 'bg-orange-50' : 'bg-yellow-50') : 'bg-blue-500'}`}
            onClick={() => {
                if (!clicked) {
                    setClicked(true)
                    if (onClick) {
                        onClick()
                    }
                }
            }}
        >
            {clicked ? (
                integer === 0 ? (
                    <ChickenSVG className="size-full fill-orange-500" />
                ) : (
                    <BananaSVG className="size-full fill-yellow-500" />
                )
            ) : (
                <span className="select-none text-5xl font-black text-blue-50">
                    {index}
                </span>
            )}
        </button>
    )
}

function ChickenBananaGameLayout({ balancedRandomIntegers }) {
    return <></>
}

function ChickenBananaGamePage() {
    // inputtedNumberOfSquares must be even.
    const inputtedNumberOfSquares = 6 * 6
    // numberOfSquares is created as a fail-safe for odd inputtedNumberOfSquares.
    const numberOfSquares = Math.floor(inputtedNumberOfSquares / 2) * 2
    const balancedRandomIntegers = createBalancedRandomIntegers(numberOfSquares)

    return (
        <ChickenBananaGameLayout
            balancedRandomIntegers={balancedRandomIntegers}
        />
    )
}

export default ChickenBananaGamePage

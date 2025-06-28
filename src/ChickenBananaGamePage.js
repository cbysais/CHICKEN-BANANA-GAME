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

function ChickenBananaGrid({ balancedRandomIntegers }) {
    return (
        <div className="grid h-fit w-fit grid-cols-6 grid-rows-6 gap-x-1 gap-y-1">
            {balancedRandomIntegers.map((randomInteger, index) => (
                <Square
                    integer={randomInteger}
                    index={index + 1}
                    key={`square-${index + 1}`}
                />
            ))}
        </div>
    )
}

function PlayerStats({ integer, correctClicks, possibleCorrectClicks }) {
    return (
        <div className="flex flex-col items-center justify-center gap-y-16">
            <span
                className={`select-none text-center text-5xl font-black ${integer === 0 ? 'text-orange-500' : 'text-yellow-500'}`}
            >
                Player {integer + 1}
            </span>

            <div
                className={`size-24 rounded-2xl p-2 py-2 shadow-2xl ${integer === 0 ? 'bg-orange-50' : 'bg-yellow-50'}`}
            >
                {integer === 0 ? (
                    <ChickenSVG className="size-full fill-orange-500" />
                ) : (
                    <BananaSVG className="size-full fill-yellow-500" />
                )}
            </div>
            <span
                className={`select-none text-center text-5xl font-black ${integer === 0 ? 'text-orange-500' : 'text-yellow-500'}`}
            >
                {((correctClicks / possibleCorrectClicks) * 100).toFixed(2)}%
            </span>
        </div>
    )
}

function ChickenBananaGameLayout({ balancedRandomIntegers }) {
    return (
        <div className="flex h-screen w-screen items-center justify-center bg-blue-50">
            <div className="flex h-full w-1/4 flex-col items-center justify-evenly">
                <div />
                <PlayerStats
                    integer={0}
                    correctClicks={0}
                    possibleCorrectClicks={balancedRandomIntegers.length / 2}
                />
                <div />
            </div>

            <div className="flex h-full flex-col items-center justify-evenly">
                <span className="select-none text-5xl font-black text-blue-500">
                    <span className="text-orange-500">Chicken</span>{' '}
                    <span className="text-yellow-500">Banana</span> Game
                </span>
                <ChickenBananaGrid
                    balancedRandomIntegers={balancedRandomIntegers}
                />
                <div />
            </div>

            <div className="flex h-full w-1/4 flex-col items-center justify-evenly">
                <div />
                <PlayerStats
                    integer={1}
                    correctClicks={0}
                    possibleCorrectClicks={balancedRandomIntegers.length / 2}
                />
                <div />
            </div>
        </div>
    )
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

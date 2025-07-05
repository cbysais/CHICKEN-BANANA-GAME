import { useEffect, useState } from 'react'

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

function Square({
    currentPlayerInteger,
    integer,
    index,
    onClick,
    disabled,
    resetClicks,
}) {
    const [clicked, setClicked] = useState(false)
    const [clickedBy, setClickedBy] = useState(undefined)

    useEffect(() => {
        setClicked(false)
    }, [resetClicks])

    return (
        <button
            className={`size-24 rounded-2xl p-2 py-2 shadow-2xl ${clicked ? (integer === 0 ? 'bg-orange-50' : 'bg-yellow-50') : disabled ? 'bg-gray-500' : 'bg-blue-500'} ${clicked && `border-4 border-solid ${clickedBy === 0 ? 'border-orange-500' : 'border-yellow-500'}`}`}
            onClick={() => {
                if (!clicked) {
                    setClicked(true)
                    if (onClick) {
                        onClick()
                        setClickedBy(currentPlayerInteger)
                    }
                }
            }}
            disabled={disabled}
        >
            {clicked || disabled ? (
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

function ChickenBananaGrid({
    balancedRandomIntegers,
    resetClicks,
    //
    turn,
    setTurn,
    //
    playerOneInteger,
    playerOneCorrectClicks,
    setPlayerOneCorrectClicks,
    playerOneStatus,
    setPlayerOneStatus,
    //
    playerTwoInteger,
    playerTwoCorrectClicks,
    setPlayerTwoCorrectClicks,
    playerTwoStatus,
    setPlayerTwoStatus,
}) {
    return (
        <div className="grid h-fit w-fit grid-cols-6 grid-rows-6 gap-x-1 gap-y-1">
            {balancedRandomIntegers.map((randomInteger, index) => (
                <Square
                    currentPlayerInteger={
                        turn % 2 === 1 ? playerOneInteger : playerTwoInteger
                    }
                    integer={randomInteger}
                    index={index + 1}
                    onClick={() => {
                        if (turn % 2 === 1) {
                            // Player 1
                            if (playerOneInteger === randomInteger) {
                                if (
                                    playerOneCorrectClicks + 1 ===
                                    balancedRandomIntegers.length / 2
                                ) {
                                    setPlayerOneStatus('draws')
                                    setPlayerTwoStatus('draws')
                                }

                                setPlayerOneCorrectClicks(
                                    playerOneCorrectClicks + 1
                                )
                            } else {
                                setPlayerOneStatus('loses')
                                setPlayerTwoStatus('wins')
                            }
                        } else {
                            // Player 2
                            if (playerTwoInteger === randomInteger) {
                                setPlayerTwoCorrectClicks(
                                    playerTwoCorrectClicks + 1
                                )
                            } else {
                                setPlayerOneStatus('wins')
                                setPlayerTwoStatus('loses')
                            }
                        }

                        setTurn(turn + 1)
                    }}
                    //
                    key={`square-${index + 1}`}
                    disabled={
                        playerOneStatus !== 'ongoing' &&
                        playerTwoStatus !== 'ongoing'
                    }
                    resetClicks={resetClicks}
                />
            ))}
        </div>
    )
}

function PlayerStats({
    number,
    integer,
    correctClicks,
    possibleCorrectClicks,
    playerTurn,
    playerStatus,
}) {
    return (
        <div className="flex h-full w-1/4 flex-col items-center justify-center gap-y-16">
            <span
                className={`select-none text-center text-5xl font-black ${integer === 0 ? 'text-orange-500' : 'text-yellow-500'}`}
            >
                Player {number}
                {playerStatus === 'ongoing' ? (
                    <span className={`${!playerTurn && 'invisible'}`}>
                        's
                        <br />
                        <span className="text-blue-500"> Turn</span>
                    </span>
                ) : (
                    <span
                        className={`capitalize ${playerStatus === 'wins' && 'text-green-500'} ${playerStatus === 'loses' && 'text-red-500'} ${playerStatus === 'draws' && 'text-gray-500'}`}
                    >
                        <br />
                        {playerStatus}
                    </span>
                )}
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

function ChickenBananaGameLayout({
    balancedRandomIntegers,
    setBalancedRandomIntegers,
    numberOfSquares,
}) {
    const [turn, setTurn] = useState(1)
    const [resetClicks, setResetClicks] = useState(0)

    const [playerOneInteger, setPlayerOneInteger] = useState(0)
    const [playerTwoInteger, setPlayerTwoInteger] = useState(1)

    const [playerOneCorrectClicks, setPlayerOneCorrectClicks] = useState(0)
    const [playerTwoCorrectClicks, setPlayerTwoCorrectClicks] = useState(0)

    // Status = ongoing, loses, draws, wins
    const [playerOneStatus, setPlayerOneStatus] = useState('ongoing')
    const [playerTwoStatus, setPlayerTwoStatus] = useState('ongoing')

    return (
        <div
            className={`flex h-screen w-screen items-center justify-center ${turn === 1 ? 'bg-blue-50' : turn % 2 === 1 ? `${playerOneInteger === 0 ? 'bg-orange-200' : 'bg-yellow-200'}` : `${playerTwoInteger === 1 ? 'bg-yellow-200' : 'bg-orange-200'}`}`}
        >
            <PlayerStats
                number={1}
                integer={playerOneInteger}
                correctClicks={playerOneCorrectClicks}
                possibleCorrectClicks={balancedRandomIntegers.length / 2}
                playerTurn={turn % 2 === 1}
                playerStatus={playerOneStatus}
            />

            <div className="flex h-full flex-col items-center justify-evenly">
                <span className="select-none text-center text-5xl font-black text-blue-500">
                    <span className="text-orange-500">Chicken</span>{' '}
                    <span className="text-yellow-500">Banana</span> Game
                </span>
                <ChickenBananaGrid
                    balancedRandomIntegers={balancedRandomIntegers}
                    resetClicks={resetClicks}
                    //
                    turn={turn}
                    setTurn={setTurn}
                    //
                    playerOneInteger={playerOneInteger}
                    playerOneCorrectClicks={playerOneCorrectClicks}
                    setPlayerOneCorrectClicks={setPlayerOneCorrectClicks}
                    playerOneStatus={playerOneStatus}
                    setPlayerOneStatus={setPlayerOneStatus}
                    //
                    playerTwoInteger={playerTwoInteger}
                    playerTwoCorrectClicks={playerTwoCorrectClicks}
                    setPlayerTwoCorrectClicks={setPlayerTwoCorrectClicks}
                    playerTwoStatus={playerTwoStatus}
                    setPlayerTwoStatus={setPlayerTwoStatus}
                />
                <button
                    className={`rounded-2xl px-2 py-2 ${turn === 1 ? `${playerOneInteger === 0 ? 'bg-gradient-to-r' : 'bg-gradient-to-l'} from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600` : `${playerOneStatus === 'ongoing' && playerTwoStatus === 'ongoing' && 'invisible'} bg-gray-500 hover:bg-gray-600`}`}
                    type="button"
                    onClick={() => {
                        if (turn === 1) {
                            // Switch sides.
                            setPlayerOneInteger(playerTwoInteger)
                            setPlayerTwoInteger(playerOneInteger)
                        } else {
                            // Reset game.
                            setBalancedRandomIntegers([
                                ...createBalancedRandomIntegers(
                                    numberOfSquares
                                ),
                            ])
                            setResetClicks(resetClicks + 1)
                            setTurn(1)
                            setPlayerOneCorrectClicks(0)
                            setPlayerTwoCorrectClicks(0)
                            setPlayerOneStatus('ongoing')
                            setPlayerTwoStatus('ongoing')
                        }
                    }}
                >
                    <span className="select-none text-5xl font-black text-blue-50">
                        {turn === 1 ? 'Switch Sides' : 'Reset Game'}
                    </span>
                </button>
                <div />
            </div>

            <PlayerStats
                number={2}
                integer={playerTwoInteger}
                correctClicks={playerTwoCorrectClicks}
                possibleCorrectClicks={balancedRandomIntegers.length / 2}
                playerTurn={turn % 2 === 0}
                playerStatus={playerTwoStatus}
            />
        </div>
    )
}

function ChickenBananaGamePage() {
    // inputtedNumberOfSquares must be even.
    const inputtedNumberOfSquares = 6 * 6
    // numberOfSquares is created as a fail-safe for odd inputtedNumberOfSquares.
    const numberOfSquares = Math.floor(inputtedNumberOfSquares / 2) * 2
    const [balancedRandomIntegers, setBalancedRandomIntegers] = useState(
        createBalancedRandomIntegers(numberOfSquares)
    )

    return (
        <ChickenBananaGameLayout
            balancedRandomIntegers={balancedRandomIntegers}
            setBalancedRandomIntegers={setBalancedRandomIntegers}
            numberOfSquares={numberOfSquares}
        />
    )
}

export default ChickenBananaGamePage

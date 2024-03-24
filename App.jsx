import React from "react"
import Die from "./components/Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"
import "./index.css"

export default function App(){
    const [dice, setDice]=React.useState(allNewDice())
    const [tenzies, setTenzies]=React.useState(false)

    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
        }
    }, [dice])

    function allNewDice(){
        const dieArray=[]
        for(let i=0;i<10;i++){
            dieArray.push(generateNewDie())
        }
        return dieArray
    }

    function generateNewDie(){
        return {
            value:Math.floor(Math.random()*6)+1,
            isHeld:false,
            id:nanoid()
        }
    }

    function rollDice() {
        if(!tenzies) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? 
                    die :
                    generateNewDie()
            }))
        } else {
            setTenzies(false)
            setDice(allNewDice())
        }
    }

    function hold(id){
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
    }

    const dieComponents=dice.map(data=> <Die key={data.id} id={data.id} value={data.value} isHeld={data.isHeld} handleClick={()=>hold(data.id)}/>)
    return (
        <main>
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {dieComponents}
            </div>
            <button 
                className="roll-dice" 
                onClick={rollDice}
            >
                {tenzies ? "New Game" : "Roll"}
            </button>
        </main>
    )
}
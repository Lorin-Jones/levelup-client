import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { getGame, getGameTypes, updateGame } from '../../managers/GameManager.js'


export const UpdateGameForm = () => {
    const navigate = useNavigate()
    const [gameTypes, setGameTypes] = useState([])
    const [game, setGame] = useState({})
    let {gameId} = useParams()

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */

    useEffect(() => {
        getGame(gameId).then(gameData => setGame(gameData))
        
        // TODO: Get the game types, then set the state
    }, [gameId])

    useEffect(() => {
        getGameTypes().then(gameTypeData => setGameTypes(gameTypeData))
        
        // TODO: Get the game types, then set the state
    }, [])
    

    const changeGameState = (domEvent) => {
        const copy = { ...game }
        copy[domEvent.target.name] = domEvent.target.value
        setGame(copy)
        // TODO: Complete the onChange function

    }



    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Edit Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={game.title}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                        value={game.maker}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="numOfPlayers">Number of Players: </label>
                    <input type="number" name="number_of_players" required autoFocus className="form-control"
                        value={game.number_of_players}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="skill-level">Skill Level: </label>
                    <input type="number" name="skill_level" min="1" max="5" required autoFocus className="form-control"
                        value={game.skill_level}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div>
                    <label htmlFor="game-type"></label>
                    <select
                    className="form_select"
                    onChange={changeGameState}
                    name="game_type"
                    required autoFocus>
                    <option value="0">Choose Type</option>
                    {gameTypes.map(
                        (type) => {
                            return <option className="form-option" value={`${type.id}`}>{type.label}</option>
                        }
                    )
                    }
                    </select>
                </div>


            </fieldset>
          

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const updatedGame = {
                        title: game.title,
                        maker: game.maker,
                        number_of_players: parseInt(game.number_of_players),
                        skill_level: parseInt(game.skill_level),
                        game_type: parseInt(game.game_type)
                    }

                    // Send POST request to your API
                    updateGame(updatedGame, gameId)
                        .then(() => navigate(`/games`))
                }}
                className="btn btn-primary">Update</button>
        </form>
    )
}
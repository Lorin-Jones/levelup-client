import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getGame } from "../../managers/GameManager"

export const GameDetails = () => {
    const { gameId } = useParams()
    const [details, setDetails] = useState({
    })
    const navigate = useNavigate()

    useEffect(
        () => {
            getGame(gameId).then(setDetails)
        },
        [gameId]
    )

    return <>
            <div className="gameDetailHeader">
                <h2>{details.title}</h2>
            </div> 
            <div>Made by {details.maker}</div>
            <div>Can be played by {details.number_of_players} people</div>
            <div>Difficulty: {details.skill_level}</div>
            <div>Game Type:{details?.game_type?.label}</div>
            <div>Gamer: {details?.user?.full_name}</div>


    </>
    
}

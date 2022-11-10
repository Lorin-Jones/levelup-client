import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { deleteGame, getGames } from "../../managers/GameManager.js"

export const GameList = (props) => {
    const [ games, setGames ] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])

    return (
        <article className="games">
            <h2 className="header">Games</h2>
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    navigate({ pathname: "/games/new" })
                }}
            >Register New Game</button>
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <Link to={`${game.id}`} className="game__title">{game.title} by {game.maker}</Link>
                        <div className="game__players">{game.number_of_players} players needed</div>
                        <div className="game__skillLevel">Skill level is {game.skill_level}</div>
                        <button className="btn btn-1 btn-sep icon-create"
                            onClick={() => {
                                navigate({ pathname: `/gameUpdate/${game.id}` })
                            }}
                        >Edit</button>
                        <button className="btn btn-1 btn-sep icon-create"
                            onClick={() => { deleteGame(game.id).then(window.location.reload()) }}
                        >Delete</button>
                    </section>
                })
            }
        </article>
    )
}
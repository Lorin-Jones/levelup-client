import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getEvents, joinEvent, leaveEvent } from "../../managers/EventManager.js"
import { getGamers } from "../../managers/GamerManager.js"

export const EventList = (props) => {
    const [ events, setEvents ] = useState([])
    const [ gamers, setGamers ] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])


    return (
        <article className="games">
        <h2></h2>
        <button className="btn btn-2 btn-sep icon-create"
            onClick={() => {
                navigate({ pathname: "/events/new" })
            }}
        >Register New Event</button>
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__description">{event.description}</div>
                        <div className="event__game">{event.game}</div>
                        <div className="event__datetime">{event.date} at {event.time}</div>
                        <button className="btn btn-1 btn-sep icon-create"
                            onClick={() => {
                                navigate({ pathname: `/eventUpdate/${event.id}` })
                            }}
                        >Edit</button>
                        {
                            event.joined ?
                            <button className="btn btn-1 btn-sep icon-create"
                                onClick={() => {
                                    leaveEvent(event.id)
                                    .then(window.location.reload())
                                }}
                            >Leave</button>
                            :
                            <button className="btn btn-1 btn-sep icon-create"
                                onClick={() => {
                                    joinEvent(event.id)
                                    .then(window.location.reload())
                                }}
                            >Join</button>

                        }
                        
                    </section>
                })
            }
        </article>
    )
}
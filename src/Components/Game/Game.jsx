import React from 'react'
import { Link } from 'react-router-dom';

export default function Game({ game }) {
    return <>
        <Link className="text-decoration-none" to={`/gamedetails/${game.id}`}>
            <div className="card h-100" id={game.id}>
                <div className="card-body p-0">
                    <figure><img src={game.thumbnail} className="card-img-top w-100" alt={game.title} />
                    </figure>
                    <figcaption>
                        <div className="d-flex justify-content-between mb-2 mx-3">
                            <h3 className="card-title m-0">{game.title}</h3>
                            <span className="bodySpan py-2 px-3">Free</span>
                        </div>
                        <p className="card-text mb-2 mx-3">{game.short_description}</p>
                    </figcaption>
                </div>
                <div className="d-flex justify-content-between align-items-center py-2 px-3">
                    <i className="fa-solid fa-square-plus"></i>
                    <div className='my-1'>
                        <span className="footerSpan p-2 me-2">{game.genre}</span>
                        <span>{game.platform == 'PC (Windows)' ? <i className="fa-brands fa-windows"></i> : <i className="fa-solid fa-window-maximize"></i>}</span>
                    </div>
                </div>
            </div>
        </Link>
    </>
}

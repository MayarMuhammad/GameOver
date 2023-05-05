import React from 'react'
import { Link } from 'react-router-dom';

export default function Home() {
  return <>
    <main><div className="container customMargin">
      <div className="browseGames text-center py-5">
        <h2>Find & track the best <span className='text-primary '>free-to-play</span> games!</h2>
        <p>Track what you've played and search for what to play next! Plus get free premium loot!</p>
        <Link className='btn btn-primary' to={'/all'}>Browse Games</Link>
      </div></div></main>
    <section className='container py-5'>
      <div className="recommendations">
        <h3><i className="fa-solid fa-robot"></i>Personalized Recommendations</h3>
        <div className="row">
        </div>
      </div>
    </section>
  </>
}

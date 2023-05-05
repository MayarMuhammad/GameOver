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
        <h3 className='mb-3'><i className="fa-solid fa-robot"></i>Personalized Recommendations</h3>
        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-6 mb-4">
            <Link className="text-decoration-none" to={'/gamedetails/365'}>
              <div className="card h-100" id='365'>
                <div className="card-body p-0">
                  <figure><img src='https://www.freetogame.com/g/365/thumbnail.jpg' className="card-img-top w-100" alt='Naruto Online' />
                  </figure>
                  <figcaption>
                    <div className="d-flex justify-content-between mb-2 mx-3">
                      <h3 className="card-title fs-4">Naruto Online</h3>
                      <span className="bodySpan py-2 px-3">Free</span>
                    </div>
                  </figcaption>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 mb-4">
            <Link className="text-decoration-none" to={'/gamedetails/475'}>
              <div className="card h-100" id='475'>
                <div className="card-body p-0">
                  <figure><img src='https://www.freetogame.com/g/475/thumbnail.jpg' className="card-img-top w-100" alt='Genshin Impact' />
                  </figure>
                  <figcaption>
                    <div className="d-flex justify-content-between mb-2 mx-3">
                      <h3 className="card-title fs-4">Genshin Impact</h3>
                      <span className="bodySpan py-2 px-3">Free</span>
                    </div>
                  </figcaption>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 mb-4">
            <Link className="text-decoration-none" to={'/gamedetails/523'}>
              <div className="card h-100" id='523'>
                <div className="card-body p-0">
                  <figure><img src='https://www.freetogame.com/g/523/thumbnail.jpg' className="card-img-top w-100" alt='Fall Guys' />
                  </figure>
                  <figcaption>
                    <div className="d-flex justify-content-between mb-2 mx-3">
                      <h3 className="card-title fs-4">Fall Guys</h3>
                      <span className="bodySpan py-2 px-3">Free</span>
                    </div>
                  </figcaption>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  </>
}

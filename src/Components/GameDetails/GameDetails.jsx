import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import Slider from 'react-slick';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import HoverVideoPlayer from 'react-hover-video-player';

export default function GameDetails() {

    const settings = {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 3000,
        cssEase: "linear"
    };

    const { id } = useParams();

    const [GameDetails, setGameDetails] = useState(null);
    const [loadingDone, setLoadingDone] = useState(undefined);

    async function getGameDetails(gameID) {
        try {
            const { data } = await axios.get('https://free-to-play-games-database.p.rapidapi.com/api/game',
                {
                    headers: { 'X-RapidAPI-Key': 'b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68', 'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com' },
                    params: { id: gameID }
                })
            setGameDetails(data);
            setLoadingDone(true);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(function () {
        getGameDetails(id);
    }, [])

    return <>
        {loadingDone ? <div className="gameDetailsBG customMargin p-1" style={{ background: `linear-gradient(0deg, rgba(39,43,48,0.9), rgba(39,43,48,0.9)),url(https://www.freetogame.com/g/${GameDetails.id}/background.jpg)` }}>
            <div className="container py-4">
                <div className="row">
                    <div className="col-4">
                        <HoverVideoPlayer videoSrc={`https://www.freetogame.com/g/${GameDetails.id}/videoplayback.webm`} style={{ width: '100%' }} videoStyle={{ borderRadius: "5px", width: '100%' }}
                            pausedOverlay={<img src={GameDetails.thumbnail} alt={GameDetails.title} className='w-100 h-100 rounded-2' />}
                            loadingOverlay={<div className="loading-overlay">
                                <div className="loading-spinner" />
                            </div>} />
                        <div className="playNow mt-3 d-flex justify-content-center"><span className='p-2 bg-secondary rounded-2 me-3 text-white'>FREE</span><Link to={`${GameDetails.freetogame_profile_url}`}><button className='btn btn-primary px-5'>Play Now <i className="fa-solid fa-right-from-bracket"></i></button></Link></div>
                    </div>
                    <div className="col-8">
                        <div className="gameInfo">
                            <h2 className='fs-1'>{GameDetails.title}</h2>
                            <span className='fw-bold fs-5'>About {GameDetails.title}</span>
                            <p className='mt-2'>{GameDetails.description}</p>
                        </div>
                        {GameDetails.minimum_system_requirements ? <div className="systemReq my-4"><h3 className='mb-3'>Minimum System Requirements</h3>
                            <div className=" ms-2">
                                <div className="mb-2"><label className='fw-bold me-2'>Graphics: </label>{GameDetails.minimum_system_requirements.graphics}</div>
                                <div className="mb-2"><label className='fw-bold me-2'>Processor: </label>{GameDetails.minimum_system_requirements.processor}</div>
                                <div className="mb-2"><label className='fw-bold me-2'>Memory: </label>{GameDetails.minimum_system_requirements.memory}</div>
                                <div className="mb-2"><label className='fw-bold me-2'>OS: </label>{GameDetails.minimum_system_requirements.os}</div>
                                <div className="mb-2"><label className='fw-bold me-2'>Storage: </label>{GameDetails.minimum_system_requirements.storage}</div>
                            </div>
                        </div> : ''}
                        {GameDetails.screenshots.length > 0 ? <div className="gameScreenshots my-4">
                            <h3 className='mb-3'>{GameDetails.title} Screenshots</h3>
                            <Slider {...settings}>
                                {GameDetails.screenshots.map(function (screenshot, index) {
                                    // console.log(screenshot);
                                    return <img key={index} src={screenshot.image} />
                                })}
                            </Slider>
                        </div> : ''}
                        <div className="additionalInfo my-4">
                            <h3 className='mb-3'>Additional Information</h3>
                            <div className="row ms-2">
                                <div className="col-4"><div className="mb-3"><label className='w-100 fw-bold'>Title</label>{GameDetails.title}</div></div>
                                <div className="col-4"><div className="mb-3"><label className='w-100 fw-bold'>Developer</label>{GameDetails.developer}</div></div>
                                <div className="col-4"><div className="mb-3"><label className='w-100 fw-bold'>Publisher</label>{GameDetails.publisher}</div></div>
                                <div className="col-4"><div className="mb-3"><label className='w-100 fw-bold'>Release Date</label>{GameDetails.release_date}</div></div>
                                <div className="col-4"><div className="mb-3"><label className='w-100 fw-bold'>Genre</label>{GameDetails.genre}</div></div>
                                <div className="col-4"><div className="mb-3"><label className='w-100 fw-bold'>Platform</label>{GameDetails.platform}{GameDetails.platform == 'Windows' ? <i className="fa-brands fa-windows ms-2"></i> : <i className="fa-solid fa-window-maximize ms-2"></i>}</div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> : <LoadingScreen />}

    </>
}

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Game from './../Game/Game';
import LoadingScreen from './../LoadingScreen/LoadingScreen';

export default function Platform() {
    const { type } = useParams();
    // console.log(type);
    const [platformGames, setPlatformGames] = useState(null);
    const [loadingDone, setLoadingDone] = useState(undefined);
    const [visible, setVisible] = useState(20);

    async function getPlatformGames() {
        try {
            const { data } = await axios.get('https://free-to-play-games-database.p.rapidapi.com/api/games',
                {
                    headers: { 'X-RapidAPI-Key': 'b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68', 'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com' },
                    params: { platform: type }
                })
            // console.log(data);
            setPlatformGames(data);
            setLoadingDone(true);
        } catch (error) {
            console.log(error);
        }
    }

    const loadMore = () => {
        setVisible((prevState) => prevState + 20);
    }

    useEffect(function () {
        getPlatformGames();
        // console.log('halo');
    }, [type])


    return <>{loadingDone ? <div className="container customMargin p-1"><div className="row my-5">
        {platformGames.slice(0, visible).map(function (game, index) {
            return <div key={index} className="col-xl-3 col-lg-4 col-md-6 mb-4">
                <Game game={game} />
            </div>
        })}
        {visible < platformGames.length ? <div className="col-12 text-center"><button onClick={loadMore} className='btn btn-primary'>Load More</button></div> : ''}
    </div></div> : <div className="loadingScreen"><LoadingScreen /></div>}
    </>
}

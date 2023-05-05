import axios from 'axios'
import React, { useEffect, useState } from 'react'
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import Game from '../Game/Game';

export default function AllGames() {

    const [allGames, setAllGames] = useState(null);
    const [loadingDone, setLoadingDone] = useState(undefined);
    const [visible, setVisible] = useState(20);

    async function getAllGames() {
        try {
            const { data } = await axios.get('https://free-to-play-games-database.p.rapidapi.com/api/games',
                {
                    headers: {
                        'X-RapidAPI-Key': 'b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68', 'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
                    }
                })
            // console.log(data);
            setAllGames(data);
            setLoadingDone(true);
        } catch (error) {
            console.log(error);
        }
    }

    const loadMore = () => {
        setVisible(visible + 20);
    }

    useEffect(function () {
        console.log(visible);
        getAllGames();
    }, [visible])

    return <>
        {loadingDone ? <div className="container customMargin p-1"><div className="row my-5">
            {allGames.slice(0, visible).map(function (game, index) {
                return <div key={index} className="col-xl-3 col-lg-4 col-md-6 mb-4">
                    <Game game={game} />
                </div>
            })}
            {visible < allGames.length ? <div className="col-12 text-center"><button onClick={loadMore} className='btn btn-primary'>Load More</button></div> : ''}
        </div></div> : <div className="loadingScreen"><LoadingScreen /></div>}
    </>
}

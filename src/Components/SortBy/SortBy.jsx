import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Game from './../Game/Game';
import LoadingScreen from './../LoadingScreen/LoadingScreen';

export default function SortBy() {
    const { type } = useParams();
    // console.log(type);
    const [sortByGames, setSortByGames] = useState(null);
    const [loadingDone, setLoadingDone] = useState(undefined);
    const [visible, setVisible] = useState(20);

    async function getSortByGames() {
        try {
            const { data } = await axios.get('https://free-to-play-games-database.p.rapidapi.com/api/games',
                {
                    headers: { 'X-RapidAPI-Key': 'b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68', 'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com' },
                    params: { 'sort-by': type }
                })
            // console.log(data);
            setSortByGames(data);
            setLoadingDone(true);
        } catch (error) {
            console.log(error);
        }
    }

    const loadMore = () => {
        setVisible((prevState) => prevState + 20);
    }

    useEffect(function () {
        getSortByGames();
        // console.log('halo');
    }, [type])


    return <>{loadingDone ? <div className="container customMargin p-1"><div className="row my-5">
        {sortByGames.slice(0, visible).map(function (game, index) {
            return <div key={index} className="col-xl-3 col-lg-4 col-md-6 mb-4">
                <Game game={game} />
            </div>
        })}
        {visible < sortByGames.length ? <div className="col-12 text-center"><button onClick={loadMore} className='btn btn-primary'>Load More</button></div> : ''}
    </div></div> : <div className="loadingScreen"><LoadingScreen /></div>}
    </>
}

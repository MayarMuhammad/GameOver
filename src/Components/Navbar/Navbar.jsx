import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

export default function Navbar({ loggedUser, clearUserData }) {

    const navigate = useNavigate();

    function logOut() {
        clearUserData();
        navigate('/login');
    }
    return <>
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
            <div className="container">
                <Link className="navbar-brand text-white me-5" to={"/home"}>
                    <img src={require('../../Images/logo.png')} alt="gaming logo" />
                    Game Over
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {loggedUser ? <><li className="nav-item">
                            <NavLink className={({ isActive }) => isActive ? "active nav-link" : "nav-link"} to={"/home"}>Home</NavLink>
                        </li>
                            <li className="nav-item">
                                <NavLink className={({ isActive }) => isActive ? "active nav-link" : "nav-link"} to={"/all"}>All</NavLink>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Platforms
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item platforms" id='pc' to={'games/platforms/pc'}>PC</Link></li>
                                    <li><Link className="dropdown-item platforms" id='browser' to={'games/platforms/browser'}>Browser</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Sort-By
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to={'games/sort-by/release-date'}>Release-Date</Link></li>
                                    <li><Link className="dropdown-item" to={'games/sort-by/popularity'}>Popularity</Link></li>
                                    <li><Link className="dropdown-item" to={'games/sort-by/alphabetical'}>Alphabetical</Link></li>
                                    <li><Link className="dropdown-item" to={'games/sort-by/relevance'}>Relevance</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Categories
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to={'games/category/racing'}>Racing</Link></li>
                                    <li><Link className="dropdown-item" to={'games/category/sports'}>Sports</Link></li>
                                    <li><Link className="dropdown-item" to={'games/category/social'}>Social</Link></li>
                                    <li><Link className="dropdown-item" to={'games/category/shooter'}>Shooter</Link></li>
                                    <li><Link className="dropdown-item" to={'games/category/open-world'}>Open-World</Link></li>
                                    <li><Link className="dropdown-item" to={'games/category/zombie'}>Zombie</Link></li>
                                    <li><Link className="dropdown-item" to={'games/category/fantasy'}>Fantasy</Link></li>
                                    <li><Link className="dropdown-item" to={'games/category/action-rpg'}>Action-RPG</Link></li>
                                    <li><Link className="dropdown-item" to={'games/category/action'}>Action</Link></li>
                                    <li><Link className="dropdown-item" to={'games/category/flight'}>Flight</Link></li>
                                    <li><Link className="dropdown-item" to={'games/category/battle-royale'}>Battle-Royale</Link></li>
                                </ul>
                            </li>
                        </> : ''}
                    </ul>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        {loggedUser ? <>
                            <li className="nav-item">
                                <span onClick={logOut} className="nav-link btn btn-outline-primary">Log Out</span>
                            </li>
                        </> : <> <li className="nav-item">
                            <Link className="nav-link me-3" to={"/login"}>Login</Link>
                        </li>
                            <li className="nav-item">
                                <Link className="nav-link btn btn-outline-primary me-3" to={"/register"}>Join Free</Link>
                            </li></>}
                    </ul>
                </div>
            </div>
        </nav>
    </>
}

import React from "react";
import "./Header.css";
import SearchIcon from '@material-ui/icons/Search';
import {Avatar} from "@material-ui/core";
import {useStateProviderValue} from "./StateProvider";

const Header = () => {

    const [{user}, dispatch] = useStateProviderValue();

    return(
        <div className="header">
            <div className="header__left">
                <SearchIcon />
                <input placeholder="Search for Artists, Songs and Podcasts"
                type="text"
                />
            </div>

            <div className="header__right">
                <Avatar src={user?.images[0]?.url} alt={user?.display_name} />
                <h4>{user?.display_name}</h4>
            </div>
        </div>
    )
}

export default Header;
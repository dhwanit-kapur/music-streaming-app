import React, {useEffect} from "react";
import "./Footer.css";
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import RepeatIcon from '@material-ui/icons/Repeat';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import {Slider, Grid} from "@material-ui/core";
import {useStateProviderValue} from "./StateProvider";

const Footer = ({spotify}) => {

    const [{token, item, playing}, dispatch] = useStateProviderValue();

    // useEffect(() => {
    //     console.log("First use effect", item);
    // }, [item])

    useEffect(() => {
        // console.log("Aaayush");
        spotify.getMyCurrentPlaybackState().then((r) => {
            // console.log("Printing r",r);

            dispatch({
                type: "SET_PLAYING",
                playing: r.is_playing,
            })

            dispatch({
                type: "SET_ITEM",
                item: r.item,
            })
        })
    }, [])

    const handlePlayPause = () => {
        if(playing) {
            spotify.pause();
            dispatch({
                type: "SET_PLAYING",
                playing: false,
            })
        }
        else {
            spotify.play();
            dispatch({
                type: "SET_PLAYING",
                playing: true,
            })
        }
    }

    const skipNext = () => {
        spotify.skipToNext();
        spotify.getMyCurrentPlayingTrack().then((r) => {
            dispatch({
                type: "SET_ITEM",
                item: r.item,
            })

            dispatch({
                type: "SET_PLAYING",
                playing: true,
            })
        })
    }

    const skipPrevious = () => {
        spotify.skipToPrevious();
        spotify.getMyCurrentPlayingTrack().then((r) => {
            dispatch({
                type: "SET_ITEM",
                item: r.item,
            })

            dispatch({
                type: "SET_PLAYING",
                playing: true,
            })
        })
    } 

    console.log("Checking the item name", item);

    return(
        <div className="footer">
            <div className="footer__left">
                <img className="footer__albumLogo" 
                src={item?.album.images[0].url} 
                alt={item?.name} />
                {item ? (
                    <div className="footer__songInfo">
                        <h4>{item.name}</h4>
                        <p>{item.artists.map((artist) => artist.name).join(", ")}</p>
                    </div>
                ) : (
                    <div className="footer__songInfo">
                        <h4>No song is playing</h4>
                        <p>...</p>
                    </div>
                )}
            </div>

            <div className="footer__center">
                <ShuffleIcon className="footer__green" />
                <SkipPreviousIcon onClick={skipNext} className="footer__icon" />
                {playing ? (
                    <PauseCircleOutlineIcon onClick={handlePlayPause} className="footer__icon" />
                ) : (
                    <PlayCircleOutlineIcon onClick={handlePlayPause} className="footer__icon" fontSize="large" />

                )}
                <SkipNextIcon onClick={skipPrevious} className="footer__icon" />
                <RepeatIcon className="footer__green" />
            </div>

            <div className="footer__right">
                <Grid container spacing={2}>
                    <Grid item>
                        <PlaylistPlayIcon />
                    </Grid>
                    <Grid item>
                        <VolumeDownIcon />
                    </Grid>
                    <Grid item xs>
                        <Slider aria-labelledby="continuous-slider" />
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Footer;
import './Game.css'
import React, { Component, useRef, useState, useEffect, createRef } from 'react'
import { useLocation } from 'react-router-dom';
import cute_img from '../images/eg_cute.gif'
import img_sunday from '../images/A Sunday on La Grande Jatte_Georges Seurat_1884.jpeg'
import img_impression from '../images/Impression, Sunrise_Claude Monet_1872.jpeg'
import img_self from '../images/Self-Portrait_Vincent Van Gogh_1889.jpeg'
import img_starry from '../images/Starry Night_Vincent Van Gogh_1889.jpeg'
import img_war from '../images/The Great War_René Magritte_1964.jpeg'
import img_memory from '../images/The Persistence of Memory_Salvador Dalí_1931.jpeg'
import img_scream from '../images/The Scream_Edvard Munch_1893.jpg'
import img_son from '../images/The Son of Man_René Magritte_1964.jpeg'


function Game() {
    const location = useLocation();
    const num_grids = location.state.grids;
    //const [arrItems, setArrItems] = useState([]);
    
    let table_border = 4
    let last_flipped = false
    let set_imgs = [img_sunday, img_impression, img_self, img_starry, img_war, img_memory, img_scream, img_son]
    let arr_imgs = []
    let arr_clicked = []
    let last_img_id = ""
    let is_sleeping = false
    let count_paired = 0
    let interval = 0
    let seconds = 0
    let centisecs = 0
    let table_script = ""
    let arr_items = []
    // https://stackoverflow.com/questions/38093760/how-to-access-a-dom-element-in-react-what-is-the-equilvalent-of-document-getele
    let showSecondsRef = createRef()
    let showCentisecsRef = createRef()

    const shuffle_img = () => {
        set_imgs.sort(() => {
            return Math.random() - 0.5;
        });
        let arr_tmp = set_imgs.slice(0, num_grids*num_grids/2)
        // Append elements of the second array to the first array
        Array.prototype.push.apply(arr_tmp, arr_tmp)
        arr_tmp.sort(() => {
            return Math.random() - 0.5;
        });
        console.log("Shuffled! arr_tmp: ", arr_tmp)
        arr_imgs = [];
        while (arr_tmp.length) {
            arr_imgs.push(arr_tmp.splice(0, num_grids))
        }
        console.log("Shuffled! arr_imgs: ", arr_imgs)
        reset_clicked_imgs();
    }

    const reset_clicked_imgs = () => {
        arr_clicked = [];
        for (let i=0; i<num_grids; i++) {
            let tmp_arr = []
            for (let j=0; j<num_grids; j++) {
                tmp_arr.push(false);
            }
            arr_clicked.push(tmp_arr);
        }
    }

    const grid_clicked = (event) => {
        console.log("grid_clicked: event.target: ", event.target)
        //ele.style.backgroundColor = '#007d00';
    }

    const delay = (time)=> {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    const on_img_clicked = (event) => {
        console.log("on_img_clicked: event.target: ", event.target)
        if (is_sleeping || count_paired >= (num_grids*num_grids)/2) {
            return;
        }
        let ele = event.target
        let row = ele.id.charAt(0)
        let col = ele.id.charAt(1)
        console.log(ele.id)
        console.log("row: ", row, "; col:", col)
        if (arr_clicked[row][col] == true) {
            return;
        }
        
        // Flip an image
        ele.src = arr_imgs[row][col];
        arr_clicked[row][col] = true;
        if (!last_flipped) {  
            last_flipped = true;
            last_img_id = ele.id;
        }
        else { // last_flipped == true
            // Check whether two image ids are different
            if (last_img_id == ele.id) {
                return;
            }
            let last_row = last_img_id.charAt(0), last_col = last_img_id.charAt(1);
            console.log("Last image: ", arr_imgs[last_row][last_col])
            console.log("ele.src: ", ele.src)
            // If last flipped image is the same as this flipped one
            // Do not compare with ele.src because ele.src is actually an absolute path, which is like file:///.../images/XXX.jpg
            if (arr_imgs[last_row][last_col] == arr_imgs[row][col]) {
                console.log("Paired!");
                count_paired++;
                // If all images are paired completely
                if (count_paired >= (num_grids*num_grids)/2) {
                    document.getElementById("msg").innerHTML = "FINISHED!!!";
                    stop_timer();
                }
            }
            else {
                console.log("They are different!");
                is_sleeping = true;
                delay(1000).then(() => {
                    is_sleeping = false;
                    // Set both last image and this image back to original one
                    document.getElementById(last_img_id).src = cute_img;
                    //document.getElementById("grid_table").rows[last_row].cells.item(last_col).src = "images/eg_cute.gif";
                    ele.src = cute_img;
                });
                arr_clicked[last_row][last_col] = false;
                arr_clicked[row][col] = false;
            }
            last_flipped = false;
        }
    }

    const restart_game = () => {
        window.location.reload()
    }

    const start_timer = () => {
        // https://codepen.io/cathydutton/pen/xxpOOw
        centisecs++;
        if (showSecondsRef.current == null) {
            //console.log("showSecondsRef.current is null!!")
            return
        }
        if (centisecs <= 9) {
            document.getElementById("centisecs").innerHTML = "0" + centisecs;
        }
        else if (centisecs >= 10 && centisecs < 99) {
            document.getElementById("centisecs").innerHTML = centisecs;
        }
        else if (centisecs >= 100) {
            seconds++;
            centisecs = 0
            document.getElementById("centisecs").innerHTML = "0" + centisecs;
        }
        if (seconds <= 9) {
            document.getElementById("seconds").innerHTML = "0" + seconds;
        }
        else {
            document.getElementById("seconds").innerHTML = seconds;
        }
    }

    const stop_timer = () => {
        console.log("Timer stopped!")
        clearInterval(interval);
    }

    const onload_tasks = () => {
        console.log("onload_tasks()")
        shuffle_img();
        clearInterval(interval);
        interval = setInterval(start_timer, 10);
        //start_timer();
    }

    // https://stackoverflow.com/questions/64965273/react-interval-not-stopping-after-leaving
    //const myRef = useRef(null);
    useEffect(() => {
        // myRef.current = setInterval(() => {
        //     console.log("I'm in useEffect()");
        //     if (showSecondsRef.current == null) {
        //         console.log("showSecondsRef.current is null!!")
        //     } 
        // }, 3000);
        //return stop_timer()
        return () => {
            console.log("I'm in return of useEffect()");
            //clearInterval(myRef.current);
        }
    }, [])

    useEffect(() => {
        const handleUnload = () => {
            console.log("handleUnload is triggered!")
            stop_timer()
            // event.preventDefault();
            // event.returnValue = '';
        };
        window.addEventListener('unload', handleUnload);
        console.log("I'm in the second useEffect()")

        return () => {
            console.log("I'm in return of the second useEffect()");
            window.removeEventListener('unload', handleUnload);
        }
    }, [])

    for (let i=0; i<num_grids; i++) {
        arr_items.push(i);
    }

    onload_tasks();

    return (
        <div className="Game">
            <header className="Game-header">
                <h2>Pair-Up Game</h2>
                <p id="table"></p>
                <table class="fixed" id="grid_table" border={table_border} cellpadding="2">
                {arr_items.map((item, i) => {
                    return [
                        <>
                            <tr class="fixed">
                                {arr_items.map((item, j) => {
                                    return [
                                        <td class="fixed" onClick={e => grid_clicked(e)} align="center">
                                        <img src={cute_img} id={i+""+j} align="center" onClick={e => {console.log('clicked'); on_img_clicked(e)}}/>
                                        </td>
                                    ]
                                })}
                            </tr>
                        </>
                    ]
                })}
                </table>
                <p><span id="seconds" ref={showSecondsRef}>00</span>:<span id="centisecs" ref={showCentisecsRef}>00</span></p>
                <p id="msg"></p>
                <button type="button" onClick={restart_game}>Restart Game</button>
                {/* <button type="button" onClick={history.back}>Go Back</button> */}
            </header>
        </div>
    );
    
    
}

export default Game;
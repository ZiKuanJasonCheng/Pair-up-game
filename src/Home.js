import './App.css';
import React, { useEffect, createRef } from 'react'
import { useNavigate } from "react-router-dom";
//import history from './history';

// https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_js_dropdown
// function onDropdownBtnClicked() {
//   document.getElementById("dropdown-items").classList.toggle("show");
//   console.log("onDropdownBtnClicked()")
// }

window.onclick = function(event) {
  if (!event.target.matches(".dropbtn")) {
      console.log("!event.target.matches('.dropbtn')")
      var dropdown_items = document.getElementsByClassName("dropdown-content");
      //console.log("dropdown_items: ", dropdown_items)
      for (var i=0; i<dropdown_items.length; i++) {
          var openDropdown = dropdown_items[i];
          //console.log("i: ", i, ", openDropdown: ", openDropdown)
          //console.log("i: ", i, ", openDropdown.classList: ", openDropdown.classList)
          if (openDropdown.classList.contains("show")) {
              openDropdown.classList.remove("show");
          }
      }
  }
}


function Home() {
  let navigate = useNavigate(); 

  const navigateToGamePage = () => { 
    navigate("/game", { state: { grids: num_grids } });
  }

  // https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_cascading_dropdown
  const arr_grids = [4, 6, 8]
  let num_grids = 2;
  let gridsSelRef = createRef();

  const onload_tasks = () => {
    //console.log("gridsSelRef.current: ", gridsSelRef.current)
    let gridsSel = gridsSelRef.current;  //var gridsSel = document.getElementById("select_grids");
    //console.log("gridsSel: ", gridsSel)
    for (var i=0; i<arr_grids.length; i++) {
      gridsSel.options[gridsSel.options.length] = new Option(arr_grids[i] + " x " + arr_grids[i], arr_grids[i]);
      // if (arr_grids[i] == 2) {
      //   gridsSel.options[gridsSel.options.length] = new Option(arr_grids[i] + " x " + arr_grids[i], arr_grids[i], true, false);
      // }
      // else if (arr_grids[i] == 4) {
      //   gridsSel.options[gridsSel.options.length] = new Option(arr_grids[i] + " x " + arr_grids[i], arr_grids[i], false, true);
      // }
      // else if (arr_grids[i] == 6) {
      //   gridsSel.options[gridsSel.options.length] = new Option(arr_grids[i] + " x " + arr_grids[i], arr_grids[i], false, false);
      // }
      // else if (arr_grids[i] == 8) {
      //   gridsSel.options[gridsSel.options.length] = new Option(arr_grids[i] + " x " + arr_grids[i], arr_grids[i], false, false);
      // }      
    }
    gridsSel.onchange = () => {
      console.log("Selected value: ", gridsSel.value)
      num_grids = gridsSel.value;
    }
  }

  useEffect(() => {
    const handleUnload = () => {
        console.log("handleUnload is triggered!")
    };
    window.addEventListener('unload', handleUnload);
    console.log("Hello useEffect()!")
    onload_tasks()

    return () => {
        console.log("I'm in return of the useEffect()");
        window.removeEventListener('unload', handleUnload);
    }
  }, [])

  return (
    <div className="Home">
      <header className="Home-header">
        <h2>Pair-Up Game</h2>
        <p>Select number of grids and start a game!</p>
        <div class="dropdown">
            <select name="grids" id="select_grids" ref={gridsSelRef}>
              {/* https://developer.mozilla.org/en-US/docs/Web/API/HTMLOptionElement/Option */}
              <option value="2" selected="selected">2 x 2</option>
            </select>

            {/* <button onClick={onDropdownBtnClicked} class="dropbtn">2 x 2</button>
            <div id="dropdown-items" class="dropdown-content">
                <p>2 x 2</p>
                <p>4 x 4</p>
                <p>6 x 6</p>
                <p>8 x 8</p>
                <p>10 x 10</p>
            </div> */}
        </div>

        <div>
          <button type="button" onClick={navigateToGamePage}>Start Game</button>
          {/* https://www.dhiwise.com/post/passing-parameters-to-routes-react-development */}
          {/* <Link to={{ pathname: '/game', state: { params } }}>Start Game</Link> */ }
        </div>
      </header>
    </div>
  );
  
}

export default Home;

import './App.css';
import { BrowserRouter, useNavigate, Routes, Route, Link } from "react-router-dom";
//import history from './history';

// https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_js_dropdown
// https://www.w3schools.com/howto/howto_js_cascading_dropdown.asp
// https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_cascading_dropdown
// Will get a selected item
function onDropdownBtnClicked() {
  document.getElementById("dropdown-items").classList.toggle("show");
  console.log("onDropdownBtnClicked()")
}

window.onclick = function(event) {
  if (!event.target.matches(".dropbtn")) {
      console.log("!event.target.matches('.dropbtn')")
      var dropdown_items = document.getElementsByClassName("dropdown-content");
      for (var i=0; i<dropdown_items.length; i++) {
          var openDropdown = dropdown_items[i];
          if (openDropdown.classList.contains("show")) {
              openDropdown.classList.remove("show");
          }
      }
  }
}

function Home() {
  let navigate = useNavigate(); 

  const navigateToGamePage = () => { 
    navigate("/game", { state: { grids: 2 } });
  }

  return (
    <div className="Home">
      <header className="Home-header">
        <h2>Pair-Up Game</h2>
        <p>Select number of grids and start a game!</p>
        <div class="dropdown">
            <button onClick={onDropdownBtnClicked} class="dropbtn">2 x 2</button>
            <div id="dropdown-items" class="dropdown-content">
                <p>2 x 2</p>
                <p>4 x 4</p>
                <p>6 x 6</p>
                <p>8 x 8</p>
                <p>10 x 10</p>
            </div>
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

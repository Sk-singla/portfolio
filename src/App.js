import './App.css';
import { Header } from './components/Header';
import { Menu } from './components/Menu';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import {useState} from 'react';
import { Home } from './components/Home';
import ProjectState from './context/projects/ProjectState';
import { ProjectDetail } from './components/ProjectDetail';
import SignUp from "./components/SignUp";
import Login from "./components/login";

function App() {


  const [menuVisible, setMenuVisibility] = useState(false)

  const toggleMenu = () => {
    console.log(!menuVisible);
    setMenuVisibility(!menuVisible);
  }

  return (
    <ProjectState>
      <Router>
        <div className="page-wrapper">
          <Header toggleMenu={toggleMenu} />


          <Switch>
            <Route exact path="/">
              <Home />
            </Route>

            <Route exact path="/projectDetail/:id">
              <ProjectDetail/>
            </Route>

            <Route exact path="/signup">
              <SignUp/>
            </Route>

            <Route exact path="/login">
              <Login />
            </Route>

          </Switch>

        </div>

        {menuVisible ? <Menu toggleMenu={toggleMenu} /> : <div />}
      </Router>
    </ProjectState>
  );
}

export default App;

import './App.css';
import { Header } from './components/Header';
import { Menu } from './components/Menu';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import {useContext, useEffect, useState} from 'react';
import { Home } from './components/Home';
import { ProjectDetail } from './components/ProjectDetail';
import SignUp from "./components/SignUp";
import Login from "./components/login";
import UpdateProjects from "./components/UpdateProjects";
import ProjectContext from "./context/projects/ProjectContext";
import Loading from "./components/Loading";


function App() {


  const [menuVisible, setMenuVisibility] = useState(false)
  const context = useContext(ProjectContext);
  const { fetchProjects, isLoading } = context;

  useEffect(()=>{
    dummyRequest()
    dummyRequest()
    // console.log("-----------------------------")
    fetchProjects();
  },[fetchProjects])

  const dummyRequest = async ()=>{
    try{
      const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/api/auth/getuser`,
          {
            method: 'GET',
            headers: {
              "Authorization": localStorage.getItem("token")
            }
          }
      )
      const result = await response.json()
      // console.log(result);
      if(!result.success){
        localStorage.removeItem("token")
        localStorage.removeItem("isAdmin")
      }
    }catch (e){
      console.log(e.message);
    }
  }


  const toggleMenu = () => {
    setMenuVisibility(!menuVisible);
  }

  return (
      <Router>
        <div className="page-wrapper">
          <Header toggleMenu={toggleMenu} />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>

            <Route exact path="/projectDetail/:id">
              {
                isLoading ? <Loading vertically_center={true}/>
                    : <ProjectDetail/>
              }
            </Route>

            <Route exact path="/signup">
              <SignUp/>
            </Route>

            <Route exact path="/login">
              <Login />
            </Route>

            <Route path="/update/:id">
              <UpdateProjects/>
            </Route>

          </Switch>

        </div>

        {menuVisible ? <Menu toggleMenu={toggleMenu} /> : <div />}
      </Router>
  );
}

export default App;

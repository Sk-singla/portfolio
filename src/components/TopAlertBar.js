import React, {useContext} from 'react';
import ProjectContext from "../context/projects/ProjectContext";

function TopAlertBar(props) {

    const projectContext = useContext(ProjectContext)
    const {alert} = projectContext;

    return (
        <div className={`alert alert-${alert.error ? "danger" : "success"}`} role="alert">
            {alert.message}
        </div>
    );
}

export default TopAlertBar;
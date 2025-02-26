
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from "./components/Home"
import UserDetail from "./components/UserDetail"


const App= () =>{

  return (
 
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/user/:id" component={UserDetail} />
      </Switch>
   
  );
}

export default App;

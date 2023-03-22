import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { authenticate } from "./store/session";
import HomePage from "./components/Home";
import UserProfile from "./components/UserProfile";
// import Navigation from "./components/Navigation";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
    <Switch>
      <Route exact path="/">
        <LoginFormPage />
      </Route>
      <Route path="/signup">
        <SignupFormPage />
      </Route>
    {isLoaded && (
      <>
      <Route path="/home">
        <HomePage />
      </Route>
      <Route path="/users/:id">
        <UserProfile />
      </Route>
      </>
    )}
    </Switch>
    </>
  );
}

export default App;

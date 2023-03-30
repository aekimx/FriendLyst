import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { authenticate } from "./store/session";
import HomePage from "./components/Home";
import UserProfile from "./components/UserProfile";
import PostDetail from "./components/PostDetail";
import FriendsList from "./components/FriendsList";
import FriendRequests from "./components/FriendRequests";
import SearchResults from "./components/SearchResults";
import AllMessages from "./components/Messages";
import MessagesCurrent from "./components/MessagesCurrent";

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

      <Route path="/:userId/profile">
        <UserProfile />
      </Route>

      <Route path="/posts/:id">
        <PostDetail />
      </Route>

      <Route path="/:userId/friends">
        <FriendsList />
      </Route>

      <Route path="/:userId/requests">
        <FriendRequests />
      </Route>

      <Route path="/:userId/:friendId">
        <AllMessages />
        <MessagesCurrent />
      </Route>

      <Route path="/search/results">
        <SearchResults />
      </Route>
      </>
    )}
    </Switch>
    </>
  );
}

export default App;

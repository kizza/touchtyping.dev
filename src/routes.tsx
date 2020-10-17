import { Switch, Route } from "react-router-dom";
import React from "react";
import Home from "./pages/Home";

export default (
  <Switch>
    <Route exact path="/">
      <Home />
    </Route>

    <Route path="/about">
      <p>
        This is the "covid project" of a musician and mother. A labour of love,
        sharing the songs that manifest around the house with her husband and
        two young daughters.
      </p>
      <p>
        Here's hoping it brings your home, school or playground a bunch of happy
        singing kids as well.
      </p>
    </Route>
  </Switch>
);

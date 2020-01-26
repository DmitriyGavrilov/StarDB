import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundry from '../error-boundry';
import SwapiService from '../../services/swapi-service';
import DummySwapiService from '../../services/dummy-swapi-service';

import { PeoplePage, PlanetsPage, StarshipsPage } from '../pages';
import { SwapiServiceProvider } from '../swapi-service-context';

import './app.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { StarshipDetails } from '../sw-components';

export default class App extends Component {

  state = {
    swapiService: new SwapiService()
  };

  onServiceChange = () => {
    this.setState(({ swapiService }) => {
      const Service = swapiService instanceof SwapiService ?
                        DummySwapiService : SwapiService;
      return {
        swapiService: new Service()
      };
    });
  };

  render() {

    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService} >
          <Router>
            <div className="stardb-app">
              <Header onServiceChange={this.onServiceChange} />
              <RandomPlanet />

              <Route exact path="/" render={() => <h2>Welcome To StarDB</h2>} />
              <Route exact path="/" component={PeoplePage} />

              <Route exact path="/people" render={() => <h2>People</h2>} />
              <Route path="/people/:id" render={() => <h2>People Detail</h2>} />
              <Route path="/people/:id?" component={PeoplePage} />

              <Route path="/planets" render={() => <h2>Planets</h2>} />
              <Route path="/planets" component={PlanetsPage} />

              <Route exact path="/starships" render={() => <h2>Starships</h2>} />
              <Route exact path="/starships" component={StarshipsPage} />

              <Route path="/starships/:id" 
                     render={() => <h2>Starship Detail</h2>} />
              <Route path="/starships/:id" 
                     render={({ match }) => {
                       const { id } = match.params;
                        return <StarshipDetails itemId={id} />
                     }} />
            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}

import Characters from "../../pages/Characters";
import Comics from "../../pages/Comics";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";

const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <Switch>
                    <Route exact path="/">
                        <Characters/>
                    </Route>
                    <Route exact path="/comics">
                        <Comics/>
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

export default App;
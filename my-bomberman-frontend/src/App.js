import './styles/App.css';
import GameMenu from './GameMenu';
import GameBoard from './GameBoard';
import { BrowserRouter as Router, Route, Switch}
    from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <GameMenu />
        </Route>
        <Route path='/gameBoard'>
          <GameBoard />
        </Route>
        {/* <Route path='/contact' element={<Contact />} />
        <Route path='/blogs' element={<Blogs />} />
        <Route path='/sign-up' element={<SignUp />} /> */}
      </Switch>
    </Router>
  );
}

export default App;

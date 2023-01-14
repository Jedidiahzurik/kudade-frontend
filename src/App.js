import logo from './logo.svg'; 
import {useState, useEffect} from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import SingleItem from './Pages/SingleItem';
import EditItem from './Pages/EditItem'

function App() {
  const[token, setToken] = useState('')
  const[selectedProduct, setSelectedProduct] = useState(null)

  useEffect(() => {
    console.log(token, selectedProduct)
  },[token, selectedProduct])

  return (
    <Router>
      <div className="app">
        <Switch>

          <Route exact path="/">
            <LoginPage userToken={setToken} />
          </Route>

          <Route exact path="/edit">
            <EditItem token={token} product={selectedProduct}/>
          </Route>

          <Route exact path="/order/:id">
            <SingleItem token={token} setProduct={setSelectedProduct}/>
          </Route>

        </Switch>
      </div>
    </Router>

  );
}

export default App;

import Home from './pages/Home';
import Bubbles from './components/Bubbles'
import './style/App.scss';
require('dotenv').config()

function App() {
  return (
    <div className="Main">
        <body>
          <Home></Home>
        </body>
      {/* Bubbles for background animation */}
      <Bubbles></Bubbles>
    </div>
  );
}

export default App;

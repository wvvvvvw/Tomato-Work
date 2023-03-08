import TomatoWorkApp from './components/TomatoWorkApp';
import {Provider} from 'react-redux'
import store from './redux/store'

function App() {
  return (
    <Provider store={store}>
      <TomatoWorkApp/>
    </Provider>
  );
}

export default App;

//import liraries
import React from 'react';
import {Provider} from 'react-redux';
import stores from './Redux/store';
// import persistor from "./Redux/store";
import Stack from './navigation';
import { PersistGate } from 'redux-persist/integration/react';

const { store, persistor } = stores();
function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <Stack />
      </PersistGate>
    </Provider>
  );
}

export default App;


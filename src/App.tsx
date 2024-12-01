import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { PersistGate } from 'redux-persist/integration/react';
import io, { Socket } from 'socket.io-client';

import { URL } from './axiosConfig.ts';
import router from './router/index.tsx';
import { persistor } from './store/index.ts';

export let socket: Socket;

function App() {
  useEffect(() => {
    socket = io(URL);

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <PersistGate
      loading={<div>Loading...</div>}
      persistor={persistor}
      onBeforeLift={() => console.log('PersistGate initialized')}
    >
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENTID}>
        <RouterProvider
          router={router}
          future={{
            v7_startTransition: true,
          }}
        />
      </GoogleOAuthProvider>
    </PersistGate>
  );
}

export default App;

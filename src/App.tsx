import { RouterProvider } from 'react-router-dom';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { PersistGate } from 'redux-persist/integration/react';

import router from './router/index.tsx';
import { persistor } from './store/index.ts';

function App() {
  return (
    <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
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

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HeroUIProvider } from "@heroui/react";
import './index.css'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify';
import AuthContextProvider from './context/AuthContext.jsx';
import UserContextProvider from './context/UserContext.jsx';
import BookmarksProvider from './context/BookmarksContext.jsx';
import FollowProvider from './context/FollowContext.jsx';




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HeroUIProvider>
      <AuthContextProvider>
        <UserContextProvider>
          <FollowProvider>
            <BookmarksProvider>

              <App />
              <ToastContainer />
              
            </BookmarksProvider>
          </FollowProvider>
        </UserContextProvider>
      </AuthContextProvider>
    </HeroUIProvider>
  </StrictMode>,
)

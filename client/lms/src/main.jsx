import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { appStore } from './app/store'
import { Toaster } from 'sonner'
import { useLoadUserQuery } from './features/api/authApi'
import LoadingSpinner from './components/ui/LoadingSpinner'

//just to show better loading 
const Custom = ({ children }) => {
  const { isLoading } =useLoadUserQuery();
  return <>{isLoading ? <LoadingSpinner/> : <>{children}</>}</>;
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* provide redux store to component */}
    <Provider store={appStore}> 
      <Custom>
    <App />
    <Toaster />
    </Custom>
    </Provider>
  </StrictMode>,
)











// Why We Need isLoading
// We need the isLoading state to determine whether the user data is still loading or not.
//  This is important because 
// we don't want to render the App component and the Toaster component until the user data has been fetched successfully. 
// If we render the components before the data is fetched, we may encounter errors or unexpected behavior.

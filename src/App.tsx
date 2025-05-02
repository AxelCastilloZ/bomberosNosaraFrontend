import { Outlet } from '@tanstack/react-router';
import './App.css'
import Navbar from './components/common/Navbar';

function App() {


  return (
    <>
      <div className="min-h-screen w-screen bg-white font-sans overflow-x-hidden">
        <Navbar />
        <Outlet />
      </div>
    </>
  )
}

export default App

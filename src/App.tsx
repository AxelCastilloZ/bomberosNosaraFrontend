import { Outlet } from '@tanstack/react-router';
import './App.css'

function App() {


  return (
    <>
      <div className="min-h-screen w-screen bg-white font-sans overflow-x-hidden">

        <Outlet />
      </div>
    </>
  )
}

export default App

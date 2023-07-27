import { useState } from 'react'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import CreateJob from './pages/CreateJob'
import UpdateJob from './pages/UpdateJob'
import DeleteJob from './pages/DeleteJob'
import ViewJob from './pages/ViewJob'
import ViewAllJob from './pages/ViewAllJob'
import Navigation from './components/Navigation'
import Wallet from './pages/Wallet'

import './App.css'

function App() {
  const[state,setState ]= useState({web3:null,contract:null,account:null})
  const saveState=({web3,contract,account})=>{
    setState({web3:web3,contract:contract,account:account})
  }
  const router = createBrowserRouter([
    {path:'/',element:<Wallet saveState={saveState}/> },
    {path:'/view-all-Jobs',element:<ViewAllJob/>},
    {path:'/create-Job',element:<CreateJob state={state}/>},
    {path:'/view-Job',element:<ViewJob/>},
    {path:'/update-Job',element:<UpdateJob state={state}/>},
    {path:'/delete-Job',element:<DeleteJob state={state}/>}
  ])
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App

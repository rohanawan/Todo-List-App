import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

const Dashboard = lazy(() => import('../../views/app/dashboard'))
const PageNotFound = lazy(() => import('../../components/util-components/page-404'))

const routes = [
  {
    path: '/',
    element: <Dashboard/>
  },
  {
    path: '*',
    element: <PageNotFound/>
  }
]

const setRoutes = () => routes?.map(({ path, element }) => <Route key={path} path={path} element={element}/>)

const AppRoutes = () => {
  return (
        <Suspense>
            <Routes>
                { setRoutes() }
            </Routes>
        </Suspense>
  )
}

export default AppRoutes

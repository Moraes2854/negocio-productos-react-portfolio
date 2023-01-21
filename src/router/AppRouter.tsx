import { Routes, Route, Navigate } from 'react-router-dom';
import { PanelPage } from '../panel/pages/PanelPage';
import { SalesPage } from '../sales/pages/SalesPage';

export const AppRouter = () => { 

  return (
    <Routes>
        <Route path="/app/panel" element={<PanelPage/>}/>
        <Route path="/app/ventas" element={<SalesPage />}/>
        <Route path="/*" element={<Navigate to={`/app/panel`}/>} />
    </Routes>
  )
  
}


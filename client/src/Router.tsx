import { memo } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Dashboard } from 'screens/Dashboard';
import { ShoppingCard } from 'screens/ShoppingCard';
import { ShoppingCardAdd } from 'screens/ShoppingCardAdd';
import { ShoppingCardEdit } from 'screens/ShoppingCardEdit';

export const Router = memo(() => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/shopping-card/:id" element={<ShoppingCard />} />
      <Route path="/shopping-card/add" element={<ShoppingCardAdd />} />
      <Route path="/shopping-card/edit/:id" element={<ShoppingCardEdit />} />
    </Routes>
  );
});

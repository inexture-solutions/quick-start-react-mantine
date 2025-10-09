import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from 'react-router';
import ErrorPage from '@/pages/error/ErrorPage.tsx';
import PublicLayout from '@/layouts/PublicLayout.tsx';
import HomePage from '@/pages/home/HomePage.tsx';
import ContactPage from '@/pages/contact/ContactPage.tsx';

export const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="contact" element={<ContactPage />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </>
  )
);

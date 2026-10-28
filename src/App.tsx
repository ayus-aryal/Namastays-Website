import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { ListYourProperty } from './pages/ListYourProperty';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { ExploreHub } from './pages/ExploreHub';
import { CityPage } from './pages/CityPage';
import { CategoryListingPage } from './pages/CategoryListingPage';
import { StayDetailPage } from './pages/StayDetailPage';
import { RestaurantDetailPage } from './pages/RestaurantDetailPage';
import { TrekDetailPage } from './pages/TrekDetailPage';
import { NotFound } from './pages/NotFound';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/list-your-property" element={<ListYourProperty />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />

          <Route path="/explore" element={<ExploreHub />} />
          <Route path="/explore/:citySlug" element={<CityPage />} />
          <Route path="/explore/:citySlug/:category" element={<CategoryListingPage />} />
          <Route path="/explore/:citySlug/stays/:slug" element={<StayDetailPage />} />
          <Route path="/explore/:citySlug/food/:slug" element={<RestaurantDetailPage />} />
          <Route path="/explore/:citySlug/treks/:slug" element={<TrekDetailPage />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>);

}
import Header from './custom/Header'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div>
      <Header />
      <main className="pt-16">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout

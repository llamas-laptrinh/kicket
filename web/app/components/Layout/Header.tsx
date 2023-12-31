import { CartBag } from '@app/components/CartBag/CartBag';
import { NavBar } from './NavBar/NavBar';
import { Login } from '@app/components/Login/Login';
import testIds from '@app/utils/test-ids';

const Header = () => (
  <>
    <header
      className="h-header z-40 w-full"
      data-testid={testIds.LAYOUT.HEADER}
    >
      <div className="flex px-6 sm:px-14 h-header items-center gap-4 sm:gap-8">
        <div className="flex gap-4 flex-1">
          <h2>
            <a href="/">KICKET</a>
          </h2>
          |
          <div className="flex gap-4 menu">
            <a className="font-bold hover:opacity-60" href="#">
              Ranking
            </a>
            <a className="font-bold hover:opacity-60" href="/studio">
              Create
            </a>
          </div>
        </div>

        <div className="hidden lg:block">
          <Login />
        </div>

        <div className="hidden lg:block">
          <CartBag />
        </div>
        <div>
          <NavBar />
        </div>
      </div>
    </header>
  </>
);

export default Header;

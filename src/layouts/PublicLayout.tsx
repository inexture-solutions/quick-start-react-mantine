import { Outlet } from 'react-router';
import { ToggleMode } from '@inexture/core/utils';

const PublicLayout = () => {
  return (
    <div className="relative">
      <div className="absolute right-5 top-5">
        <ToggleMode button={{ size: 'xl' }} />
      </div>
      <Outlet />
    </div>
  );
};

export default PublicLayout;

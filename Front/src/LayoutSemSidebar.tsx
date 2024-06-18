// LayoutSemSidebar.tsx

import React, { ReactNode } from 'react';

interface LayoutSemSidebarProps {
  children: ReactNode;
}

const LayoutSemSidebar: React.FC<LayoutSemSidebarProps> = ({ children }) => {
  return (
    <div className="content">
      {children}
    </div>
  );
};

export default LayoutSemSidebar;

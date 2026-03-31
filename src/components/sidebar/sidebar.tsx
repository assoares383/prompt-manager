import { prisma } from '@/lib/prisma';
import { SidebarContent } from './sidebar-content';

export const Sidebar = () => {
  const propmpts = prisma.propmpt.findMany();

  return <SidebarContent />;
};


import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UsersTable } from './UsersTable';
import { VideosTable } from './VideosTable';

export const AdminDashboard = () => {
  return (
    <Tabs defaultValue="users" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="users">Manage Users</TabsTrigger>
        <TabsTrigger value="videos">Manage Videos</TabsTrigger>
      </TabsList>
      <TabsContent value="users">
        <UsersTable />
      </TabsContent>
      <TabsContent value="videos">
        <VideosTable />
      </TabsContent>
    </Tabs>
  );
};

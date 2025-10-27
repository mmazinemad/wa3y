
import { useState } from 'react';
import { useAllUsers, AppUser } from '@/hooks/useAllUsers';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, Edit, Save, X } from 'lucide-react';

export const UsersTable = () => {
  const { users, loading, updateUser, deleteUser } = useAllUsers();
  const [editingUser, setEditingUser] = useState<AppUser | null>(null);
  const [editedName, setEditedName] = useState('');
  const [editedRole, setEditedRole] = useState<'user' | 'influencer' | 'admin'>('user');

  const startEditing = (user: AppUser) => {
    setEditingUser(user);
    setEditedName(user.name || '');
    setEditedRole(user.role || 'user');
  };

  const cancelEditing = () => {
    setEditingUser(null);
  };

  const handleUpdate = async () => {
    if (editingUser) {
      await updateUser(editingUser.id, { name: editedName, role: editedRole });
      cancelEditing();
    }
  };

  if (loading) return <div>Loading users...</div>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            {editingUser?.id === user.id ? (
              <>
                <TableCell>
                  <Input value={editedName} onChange={(e) => setEditedName(e.target.value)} />
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Select value={editedRole} onValueChange={(value) => setEditedRole(value as any)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="influencer">Influencer</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Button size="sm" onClick={handleUpdate}><Save className="h-4 w-4" /></Button>
                  <Button size="sm" variant="ghost" onClick={cancelEditing}><X className="h-4 w-4" /></Button>
                </TableCell>
              </>
            ) : (
              <>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Button size="sm" variant="ghost" onClick={() => startEditing(user)}><Edit className="h-4 w-4" /></Button>
                  <Button size="sm" variant="destructive" onClick={() => deleteUser(user.id)}><Trash2 className="h-4 w-4" /></Button>
                </TableCell>
              </>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

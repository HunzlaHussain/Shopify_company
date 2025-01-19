export type permissionT = {
    id: number;
    name: string;
    created_at: null;
    updated_at: null;
    role_permission: RolePermissionT[];
  };
  
  export type RolePermissionT = {
    business_id: number;
    can_view: string;
    can_update: string;
    can_create: string;
    can_delete: string;
    role_id: number;
    permission_id: number;
  };
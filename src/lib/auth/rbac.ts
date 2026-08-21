// Role-Based Access Control (RBAC) Engine for MiraiProcure (未来プロキュア)

import { Role, UserSession } from '@/types';

export type Permission =
  | 'MANAGE_USERS'
  | 'MANAGE_SYSTEM_SETTINGS'
  | 'MANAGE_GOVERNANCE'
  | 'CREATE_PURCHASE_REQUEST'
  | 'VIEW_PURCHASE_REQUESTS'
  | 'CREATE_RFQ'
  | 'VIEW_RFQS'
  | 'SUBMIT_QUOTATION'
  | 'VIEW_QUOTATIONS'
  | 'ANALYZE_QUOTES'
  | 'MANAGE_SUPPLIERS'
  | 'VIEW_SUPPLIERS'
  | 'CREATE_PO_DRAFT'
  | 'APPROVE_PURCHASE_ORDER'
  | 'VIEW_PURCHASE_ORDERS'
  | 'MANAGE_INVENTORY'
  | 'VIEW_INVENTORY'
  | 'MANAGE_FINANCE'
  | 'RELEASE_PAYMENTS'
  | 'VIEW_FINANCE'
  | 'MANAGE_CONTRACTS'
  | 'VIEW_CONTRACTS'
  | 'VIEW_RISK'
  | 'VIEW_APPROVALS'
  | 'APPROVE_REQUESTS'
  | 'VIEW_ANALYTICS'
  | 'VIEW_AUDIT_TRAIL'
  | 'VIEW_AI_ACTIVITY';

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  ADMIN: [
    'MANAGE_USERS',
    'MANAGE_SYSTEM_SETTINGS',
    'MANAGE_GOVERNANCE',
    'CREATE_PURCHASE_REQUEST',
    'VIEW_PURCHASE_REQUESTS',
    'CREATE_RFQ',
    'VIEW_RFQS',
    'SUBMIT_QUOTATION',
    'VIEW_QUOTATIONS',
    'ANALYZE_QUOTES',
    'MANAGE_SUPPLIERS',
    'VIEW_SUPPLIERS',
    'CREATE_PO_DRAFT',
    'APPROVE_PURCHASE_ORDER',
    'VIEW_PURCHASE_ORDERS',
    'MANAGE_INVENTORY',
    'VIEW_INVENTORY',
    'MANAGE_FINANCE',
    'RELEASE_PAYMENTS',
    'VIEW_FINANCE',
    'MANAGE_CONTRACTS',
    'VIEW_CONTRACTS',
    'VIEW_RISK',
    'VIEW_APPROVALS',
    'APPROVE_REQUESTS',
    'VIEW_ANALYTICS',
    'VIEW_AUDIT_TRAIL',
    'VIEW_AI_ACTIVITY',
  ],

  PROCUREMENT_MANAGER: [
    'CREATE_PURCHASE_REQUEST',
    'VIEW_PURCHASE_REQUESTS',
    'CREATE_RFQ',
    'VIEW_RFQS',
    'VIEW_QUOTATIONS',
    'ANALYZE_QUOTES',
    'MANAGE_SUPPLIERS',
    'VIEW_SUPPLIERS',
    'CREATE_PO_DRAFT',
    'APPROVE_PURCHASE_ORDER',
    'VIEW_PURCHASE_ORDERS',
    'VIEW_INVENTORY',
    'MANAGE_CONTRACTS',
    'VIEW_CONTRACTS',
    'VIEW_RISK',
    'VIEW_APPROVALS',
    'APPROVE_REQUESTS',
    'VIEW_ANALYTICS',
    'VIEW_AUDIT_TRAIL',
    'VIEW_AI_ACTIVITY',
  ],

  PROCUREMENT_OFFICER: [
    'CREATE_PURCHASE_REQUEST',
    'VIEW_PURCHASE_REQUESTS',
    'CREATE_RFQ',
    'VIEW_RFQS',
    'VIEW_QUOTATIONS',
    'ANALYZE_QUOTES',
    'VIEW_SUPPLIERS',
    'CREATE_PO_DRAFT',
    'VIEW_PURCHASE_ORDERS',
    'VIEW_INVENTORY',
    'VIEW_CONTRACTS',
    'VIEW_RISK',
  ],

  FINANCE_MANAGER: [
    'VIEW_PURCHASE_ORDERS',
    'MANAGE_FINANCE',
    'RELEASE_PAYMENTS',
    'VIEW_FINANCE',
    'VIEW_SUPPLIERS',
    'VIEW_ANALYTICS',
    'VIEW_AUDIT_TRAIL',
    'VIEW_RISK',
  ],

  INVENTORY_MANAGER: [
    'CREATE_PURCHASE_REQUEST',
    'VIEW_PURCHASE_REQUESTS',
    'MANAGE_INVENTORY',
    'VIEW_INVENTORY',
    'VIEW_PURCHASE_ORDERS',
    'VIEW_ANALYTICS',
  ],

  APPROVER: [
    'VIEW_PURCHASE_REQUESTS',
    'VIEW_PURCHASE_ORDERS',
    'APPROVE_PURCHASE_ORDER',
    'VIEW_APPROVALS',
    'APPROVE_REQUESTS',
    'VIEW_RISK',
    'VIEW_AUDIT_TRAIL',
  ],

  SUPPLIER: [
    'SUBMIT_QUOTATION',
    'VIEW_QUOTATIONS',
    'VIEW_PURCHASE_ORDERS',
  ],
};

// Route Access Control Matrix
export const ROLE_ROUTE_ACCESS: Record<Role, string[]> = {
  ADMIN: [
    '/dashboard',
    '/command-center',
    '/digital-twin',
    '/mirai-ai',
    '/purchase-requests',
    '/rfqs',
    '/quote-intelligence',
    '/suppliers',
    '/purchase-orders',
    '/inventory',
    '/finance',
    '/contracts',
    '/risk-center',
    '/approvals',
    '/analytics',
    '/audit-trail',
    '/ai-activity',
    '/ai-governance',
    '/settings',
  ],

  PROCUREMENT_MANAGER: [
    '/dashboard',
    '/command-center',
    '/digital-twin',
    '/mirai-ai',
    '/purchase-requests',
    '/rfqs',
    '/quote-intelligence',
    '/suppliers',
    '/purchase-orders',
    '/inventory',
    '/contracts',
    '/risk-center',
    '/approvals',
    '/analytics',
    '/audit-trail',
    '/ai-activity',
  ],

  PROCUREMENT_OFFICER: [
    '/dashboard',
    '/mirai-ai',
    '/purchase-requests',
    '/rfqs',
    '/quote-intelligence',
    '/suppliers',
    '/purchase-orders',
    '/inventory',
    '/contracts',
    '/risk-center',
  ],

  FINANCE_MANAGER: [
    '/dashboard',
    '/finance',
    '/mirai-ai',
    '/purchase-orders',
    '/suppliers',
    '/analytics',
    '/audit-trail',
  ],

  INVENTORY_MANAGER: [
    '/dashboard',
    '/inventory',
    '/mirai-ai',
    '/purchase-requests',
    '/purchase-orders',
    '/analytics',
  ],

  APPROVER: [
    '/dashboard',
    '/approvals',
    '/mirai-ai',
    '/purchase-requests',
    '/purchase-orders',
    '/risk-center',
    '/audit-trail',
  ],

  SUPPLIER: [
    '/portal',
  ],
};

/**
 * Checks if a given role has a specific permission.
 */
export function hasPermission(role: Role, permission: Permission): boolean {
  const permissions = ROLE_PERMISSIONS[role] || [];
  return permissions.includes(permission);
}

/**
 * Checks if a user session can access a route path.
 */
export function canAccessRoute(role: Role, pathname: string): boolean {
  if (role === 'ADMIN') return true;
  if (role === 'SUPPLIER' && pathname.startsWith('/portal')) return true;
  if (role !== 'SUPPLIER' && pathname.startsWith('/portal')) return false;

  const allowedRoutes = ROLE_ROUTE_ACCESS[role] || [];
  return allowedRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}

/**
 * Server-side & API authorization guard.
 */
export function authorizeRequest(user: UserSession, requiredPermission: Permission): { authorized: boolean; reason?: string } {
  if (!user || !user.role) {
    return { authorized: false, reason: 'Unauthenticated session.' };
  }

  const allowed = hasPermission(user.role, requiredPermission);
  if (!allowed) {
    return {
      authorized: false,
      reason: `Access Denied: Role '${user.role}' lacks permission '${requiredPermission}'.`,
    };
  }

  return { authorized: true };
}

/**
 * Returns default home route for a role after login.
 */
export function getDefaultRoleRoute(role: Role): string {
  switch (role) {
    case 'SUPPLIER':
      return '/portal';
    case 'FINANCE_MANAGER':
      return '/finance';
    case 'INVENTORY_MANAGER':
      return '/inventory';
    case 'APPROVER':
      return '/approvals';
    case 'PROCUREMENT_MANAGER':
    case 'PROCUREMENT_OFFICER':
    case 'ADMIN':
    default:
      return '/dashboard';
  }
}

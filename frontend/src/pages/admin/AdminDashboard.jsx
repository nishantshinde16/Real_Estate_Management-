import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getBookings } from '../../services/bookingService';
import { getFeedbacks } from '../../services/feedbackService';
import { getAllInquiries } from '../../services/inquiryService';
import { getLeads } from '../../services/leadService';
import { getProperties } from '../../services/propertyService';
import {
  createRole,
  createUser,
  getAdminStats,
  getRoles,
  getUsers,
  updateRolePermissions,
  updateUserRole,
} from '../../services/userService';

const modules = [
  { label: 'Dashboard', detail: 'Live overview', to: '/admin' },
  { label: 'Properties', detail: 'Manage listings', to: '/admin/properties/add' },
  { label: 'Bookings', detail: 'Approval workflow', to: '/admin/bookings' },
  { label: 'Leads', detail: 'Customer tracking', to: '/admin/leads' },
  { label: 'Users', detail: 'Account records', to: '#users' },
  { label: 'Inquiries', detail: 'Contact requests', to: '#inquiries' },
  { label: 'Roles', detail: 'Access groups', to: '#roles' },
  { label: 'Permissions', detail: 'Module access', to: '#permissions' },
];

const defaultRoles = [
  { _id: 'admin-default', name: 'admin', description: 'Full admin access', permissions: ['Properties', 'Bookings', 'Leads', 'Users', 'Finance', 'Feedbacks'] },
  { _id: 'user-default', name: 'user', description: 'Customer access', permissions: ['Browse Properties', 'Create Bookings', 'My Bookings', 'Inquiries'] },
];

const permissionOptions = [
  'Dashboard',
  'Properties',
  'Bookings',
  'Leads',
  'Users',
  'Inquiries',
  'Finance',
  'Feedbacks',
  'Roles',
  'Permissions',
];

function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, properties: 0, inquiries: 0 });
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState(defaultRoles);
  const [properties, setProperties] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [leads, setLeads] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [roleForm, setRoleForm] = useState({ name: '', description: '' });
  const [userForm, setUserForm] = useState({ name: '', email: '', password: '', role: 'user' });
  const [selectedRoleId, setSelectedRoleId] = useState(defaultRoles[0]._id);
  const [selectedPermissions, setSelectedPermissions] = useState(defaultRoles[0].permissions);
  const [message, setMessage] = useState('');

  const loadAdminData = () => Promise.all([
    getAdminStats(),
    getUsers(),
    getProperties(),
    getAllInquiries(),
    getLeads(),
    getBookings(),
    getFeedbacks(),
    getRoles(),
  ]);

  useEffect(() => {
    let active = true;

    loadAdminData().then(([statsRes, usersRes, propertiesRes, inquiriesRes, leadsRes, bookingsRes, feedbacksRes, rolesRes]) => {
      if (!active) return;
      const loadedRoles = rolesRes.data.length ? rolesRes.data : defaultRoles;
      setStats(statsRes.data);
      setUsers(usersRes.data);
      setRoles(loadedRoles);
      setProperties(propertiesRes.data);
      setInquiries(inquiriesRes.data);
      setLeads(leadsRes.data);
      setBookings(bookingsRes.data);
      setFeedbacks(feedbacksRes.data);
      setSelectedRoleId(loadedRoles[0]._id);
      setSelectedPermissions(loadedRoles[0].permissions || []);
    });

    return () => {
      active = false;
    };
  }, []);

  const refreshUsersAndRoles = async () => {
    const [usersRes, rolesRes] = await Promise.all([getUsers(), getRoles()]);
    const loadedRoles = rolesRes.data.length ? rolesRes.data : defaultRoles;
    setUsers(usersRes.data);
    setRoles(loadedRoles);
    return loadedRoles;
  };

  const handleCreateRole = async (event) => {
    event.preventDefault();
    setMessage('');
    const response = await createRole({ ...roleForm, permissions: [] });
    const loadedRoles = await refreshUsersAndRoles();
    setRoleForm({ name: '', description: '' });
    setSelectedRoleId(response.data._id);
    setSelectedPermissions([]);
    setRoles(loadedRoles);
    setMessage('Role created successfully.');
  };

  const handlePermissionToggle = (permission) => {
    setSelectedPermissions((current) => (
      current.includes(permission)
        ? current.filter((item) => item !== permission)
        : [...current, permission]
    ));
  };

  const handleRoleSelection = (roleId) => {
    const role = roles.find((item) => item._id === roleId);
    setSelectedRoleId(roleId);
    setSelectedPermissions(role?.permissions || []);
  };

  const handleSavePermissions = async (event) => {
    event.preventDefault();
    setMessage('');
    if (selectedRoleId.includes('default')) {
      setMessage('Create this role first before saving permissions.');
      return;
    }
    await updateRolePermissions(selectedRoleId, selectedPermissions);
    await refreshUsersAndRoles();
    setMessage('Permissions updated successfully.');
  };

  const handleCreateUser = async (event) => {
    event.preventDefault();
    setMessage('');
    await createUser(userForm);
    const loadedRoles = await refreshUsersAndRoles();
    setStats((current) => ({ ...current, users: current.users + 1 }));
    setUserForm({ name: '', email: '', password: '', role: loadedRoles[0]?.name || 'user' });
    setMessage('User created successfully.');
  };

  const handleUserRoleChange = async (userId, role) => {
    setMessage('');
    const response = await updateUserRole(userId, role);
    setUsers((current) => current.map((user) => (user._id === userId ? response.data : user)));
    setMessage('User role updated successfully.');
  };

  return (
    <section className="admin-dashboard">
      <div className="admin-hero">
        <div>
          <p className="eyebrow">Admin Overview</p>
          <h1>Manage real estate operations from one workspace.</h1>
          <p>Track property inventory, bookings, leads, users, inquiries, media, feedback, roles, and permissions with fast access to every admin module.</p>
        </div>
        <Link className="btn" to="/admin/properties/add">Add Property</Link>
      </div>
      <div className="admin-metric-grid">
        <div><span>Properties</span><strong>{stats.properties}</strong><small>Active listings</small></div>
        <div><span>Bookings</span><strong>{bookings.length}</strong><small>Customer bookings</small></div>
        <div><span>Leads</span><strong>{leads.length}</strong><small>Sales pipeline</small></div>
        <div><span>Users</span><strong>{stats.users}</strong><small>Registered users</small></div>
        <div><span>Inquiries</span><strong>{stats.inquiries}</strong><small>Open conversations</small></div>
        <div><span>Feedbacks</span><strong>{feedbacks.length}</strong><small>Review queue</small></div>
      </div>

      <p className="eyebrow admin-section-label">Modules</p>
      <h2>Operational Snapshot</h2>
      <div className="admin-module-grid">
        {modules.map((module) => (
          <Link key={module.label} to={module.to}>
            <span>{module.label.charAt(0)}</span>
            <div>
              <strong>{module.label}</strong>
              <small>{module.detail}</small>
            </div>
          </Link>
        ))}
      </div>

      <div className="admin-panels">
        <section>
          <div className="admin-panel-heading">
            <h2>Booking History</h2>
            <Link to="/admin/bookings">View all</Link>
          </div>
          <div className="admin-record-list">
            {bookings.slice(0, 4).map((booking) => (
              <div key={booking._id}>
                <strong>{booking.customerName}</strong>
                <span>{booking.propertyId?.title || 'Property'}</span>
                <span className={`status-pill status-${booking.status.toLowerCase()}`}>{booking.status}</span>
              </div>
            ))}
          </div>
        </section>
        <section>
          <div className="admin-panel-heading">
            <h2>Lead Status Tracking</h2>
            <Link to="/admin/leads">View all</Link>
          </div>
          <div className="admin-record-list">
            {leads.slice(0, 4).map((lead) => (
              <div key={lead._id}>
                <strong>{lead.fullName}</strong>
                <span>{lead.email}</span>
                <span className={`status-pill status-${lead.status.toLowerCase().replace('-', '')}`}>{lead.status}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="admin-panels">
        <section>
          <div className="admin-panel-heading">
            <h2>Properties</h2>
            <Link to="/admin/properties/add">Add property</Link>
          </div>
          <div className="admin-record-list">
            {properties.slice(0, 5).map((property) => (
              <div key={property._id}>
                <strong>{property.title}</strong>
                <span>{property.location}</span>
                <span>{property.status || property.type || 'Listed'}</span>
              </div>
            ))}
          </div>
        </section>
        <section id="inquiries">
          <h2>Inquiries</h2>
          <div className="admin-record-list">
            {inquiries.slice(0, 5).map((inquiry) => (
              <div key={inquiry._id}>
                <strong>{inquiry.name || inquiry.userId?.name || 'Visitor'}</strong>
                <span>{inquiry.propertyId?.title || 'General Contact'}</span>
                <span>{inquiry.message}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="admin-panels">
        <section id="users">
          <h2>Users</h2>
          <form className="admin-inline-form" onSubmit={handleCreateUser}>
            <input
              placeholder="Name"
              required
              value={userForm.name}
              onChange={(event) => setUserForm({ ...userForm, name: event.target.value })}
            />
            <input
              placeholder="Email"
              required
              type="email"
              value={userForm.email}
              onChange={(event) => setUserForm({ ...userForm, email: event.target.value })}
            />
            <input
              minLength="6"
              placeholder="Password"
              required
              type="password"
              value={userForm.password}
              onChange={(event) => setUserForm({ ...userForm, password: event.target.value })}
            />
            <select value={userForm.role} onChange={(event) => setUserForm({ ...userForm, role: event.target.value })}>
              {roles.map((role) => <option key={role._id} value={role.name}>{role.name}</option>)}
            </select>
            <button className="btn" type="submit">Create User</button>
          </form>
          <div className="admin-record-list">
            {users.map((user) => (
              <div key={user._id}>
                <strong>{user.name}</strong>
                <span>{user.email}</span>
                <select value={user.role} onChange={(event) => handleUserRoleChange(user._id, event.target.value)}>
                  {roles.map((role) => <option key={role._id} value={role.name}>{role.name}</option>)}
                </select>
              </div>
            ))}
          </div>
        </section>
        <section id="roles">
          <h2>Roles & Permissions</h2>
          {message && <p className="success">{message}</p>}
          <form className="admin-inline-form" onSubmit={handleCreateRole}>
            <input
              placeholder="Role name"
              required
              value={roleForm.name}
              onChange={(event) => setRoleForm({ ...roleForm, name: event.target.value })}
            />
            <input
              placeholder="Description"
              value={roleForm.description}
              onChange={(event) => setRoleForm({ ...roleForm, description: event.target.value })}
            />
            <button className="btn" type="submit">Create Role</button>
          </form>
          <form className="permission-editor" onSubmit={handleSavePermissions}>
            <select value={selectedRoleId} onChange={(event) => handleRoleSelection(event.target.value)}>
              {roles.map((role) => <option key={role._id} value={role._id}>{role.name}</option>)}
            </select>
            <div className="permission-grid">
              {permissionOptions.map((permission) => (
                <label key={permission}>
                  <input
                    checked={selectedPermissions.includes(permission)}
                    type="checkbox"
                    onChange={() => handlePermissionToggle(permission)}
                  />
                  <span>{permission}</span>
                </label>
              ))}
            </div>
            <button className="btn" type="submit">Save Permissions</button>
          </form>
          <div className="role-grid" id="permissions">
            {roles.map((role) => (
              <article key={role._id}>
                <strong>{role.name}</strong>
                {role.description && <small>{role.description}</small>}
                <div>
                  {(role.permissions || []).map((item) => <span key={item}>{item}</span>)}
                  {!role.permissions?.length && <span>No permissions assigned</span>}
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}

export default AdminDashboard;

import React, { useState, useEffect } from "react";
import {
  Card,
  Table,
  Button,
  Modal,
  Form,
  InputGroup,
  Collapse,
  OverlayTrigger,
  Tooltip
} from "react-bootstrap";
import { FaEdit, FaTrash, FaUsers, FaEye } from "react-icons/fa";

// Default roles data
const defaultRoles = [
  { id: 1, name: "Admin", users: 2, permissions: ["Full Access"], lastModified: "12 Sep 2024", type: "superadmin", isActive: true, modulePermissions: { "Account": ["Create", "View", "Update", "Delete"] } },
  { id: 2, name: "Manager", users: 3, permissions: ["View", "Create", "Edit"], lastModified: "24 Oct 2024", type: "company", isActive: true, modulePermissions: { "Inventory": ["Create", "View"] } },
  { id: 3, name: "Salesman", users: 4, permissions: ["View", "Create"], lastModified: "18 Feb 2024", type: "user", isActive: false, modulePermissions: { "POS": ["Create", "View"] } },
];

const allPermissions = ["View", "Create", "Edit", "Full Access"];
const tallyModules = [
  { name: "Account", permissions: ["Create", "View", "Update", "Delete"] },
  { name: "Inventory", permissions: ["Create", "View", "Update", "Delete"] },
  { name: "POS", permissions: ["Create", "View", "Update", "Delete"] },
  { name: "Sales", permissions: ["Create", "View", "Update", "Delete"] },
  { name: "Purchase", permissions: ["Create", "View", "Update", "Delete"] },
  { name: "GST", permissions: ["Create", "View", "Update", "Delete"] },
  { name: "User Management", permissions: ["Create", "View", "Update", "Delete"] },
  { name: "Report", permissions: ["View"] },
  { name: "Setting", permissions: ["View", "Update"] }
];

const RolesPermissions = () => {
  const [roles, setRoles] = useState(defaultRoles);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showView, setShowView] = useState(false);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ name: "", permissions: [], type: "user", modulePermissions: {} });
  const [customRoleTypes, setCustomRoleTypes] = useState([]);
  const [showAddTypeModal, setShowAddTypeModal] = useState(false);
  const [newRoleType, setNewRoleType] = useState("");
  const [expandedModules, setExpandedModules] = useState({}); // For collapsible modules

  useEffect(() => {
    const saved = localStorage.getItem("customRoleTypes");
    if (saved) setCustomRoleTypes(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (customRoleTypes.length > 0) localStorage.setItem("customRoleTypes", JSON.stringify(customRoleTypes));
  }, [customRoleTypes]);

  const toggleRoleStatus = (roleId) => {
    setRoles(roles.map(role => role.id === roleId ? { ...role, isActive: !role.isActive } : role));
  };

  const filteredRoles = roles.filter(role => {
    const matchesSearch = role.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || (statusFilter === "Active" && role.isActive) || (statusFilter === "Inactive" && !role.isActive);
    const roleDate = new Date(role.lastModified);
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;
    const matchesDate = (!from || roleDate >= from) && (!to || roleDate <= to);
    return matchesSearch && matchesStatus && matchesDate;
  });

  const handleAdd = () => {
    const initialModulePermissions = {};
    tallyModules.forEach(module => initialModulePermissions[module.name] = []);
    setForm({ name: "", permissions: [], type: "user", modulePermissions: initialModulePermissions });
    setExpandedModules({});
    setShowAdd(true);
  };

  const handleAddSave = () => {
    if (!form.name.trim()) return;
    const newRole = { id: Date.now(), name: form.name, users: 0, permissions: [...form.permissions], lastModified: new Date().toISOString().split('T')[0], type: form.type, isActive: true, modulePermissions: { ...form.modulePermissions } };
    setRoles(prev => [...prev, newRole]);
    setShowAdd(false);
  };

  const handleEdit = (role) => {
    setSelected(role);
    setForm({ name: role.name, permissions: [...role.permissions], type: role.type, modulePermissions: { ...role.modulePermissions } });
    setExpandedModules({});
    setShowEdit(true);
  };

  const handleEditSave = () => {
    if (!form.name.trim()) return;
    setRoles(prev => prev.map(r => r.id === selected.id ? { ...r, name: form.name, permissions: [...form.permissions], lastModified: new Date().toISOString().split('T')[0], type: form.type, modulePermissions: { ...form.modulePermissions } } : r));
    setShowEdit(false);
  };

  const handleDelete = (role) => { setSelected(role); setShowDelete(true); };
  const handleDeleteConfirm = () => { setRoles(prev => prev.filter(r => r.id !== selected.id)); setShowDelete(false); };
  const handleView = (role) => { setSelected(role); setShowView(true); };

  const toggleGeneralPerm = (perm) => {
    if (perm === "Full Access") setForm(f => ({ ...f, permissions: f.permissions.includes("Full Access") ? [] : ["Full Access"] }));
    else setForm(f => {
      const perms = [...f.permissions];
      if (perms.includes("Full Access")) return { ...f, permissions: [perm] };
      const index = perms.indexOf(perm);
      if (index !== -1) perms.splice(index, 1); else perms.push(perm);
      return { ...f, permissions: perms };
    });
  };

  const toggleModulePerm = (moduleName, perm) => {
    setForm(prev => {
      const current = prev.modulePermissions[moduleName] || [];
      const index = current.indexOf(perm);
      const updated = index !== -1 ? current.filter(p => p !== perm) : [...current, perm];
      return { ...prev, modulePermissions: { ...prev.modulePermissions, [moduleName]: updated } };
    });
  };

  const toggleModuleFullAccess = (moduleName) => {
    setForm(prev => {
      const module = tallyModules.find(m => m.name === moduleName);
      const perms = module ? module.permissions : [];
      const hasFull = prev.modulePermissions[moduleName]?.includes("Full Access");
      return { ...prev, modulePermissions: { ...prev.modulePermissions, [moduleName]: hasFull ? [] : ["Full Access", ...perms] } };
    });
  };

  const toggleCollapseModule = (moduleName) => {
    setExpandedModules(prev => ({ ...prev, [moduleName]: !prev[moduleName] }));
  };

  return (
    <div className="p-4" style={{ background: "#f8f9fa", minHeight: "100vh" }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 style={{ fontWeight: 600 }}>Roles & Permission</h4>
          <p style={{ marginBottom: 0, color: "#666" }}>Manage your roles efficiently</p>
        </div>
        <Button onClick={handleAdd} style={{ backgroundColor: "#3daaaa", borderColor: "#3daaaa" }}>+ Add Role</Button>
      </div>

      {/* Filters */}
      <Card className="mb-3 p-3">
        <div className="d-flex flex-wrap gap-3 align-items-end">
          <Form.Group>
            <Form.Label>Search Role</Form.Label>
            <Form.Control placeholder="Enter role name" value={search} onChange={(e) => setSearch(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Status</Form.Label>
            <Form.Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>From</Form.Label>
            <Form.Control type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>To</Form.Label>
            <Form.Control type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
          </Form.Group>
          <div>
            <Form.Label>&nbsp;</Form.Label>
            <Button variant="outline-secondary" onClick={() => { setSearch(""); setStatusFilter("All"); setFromDate(""); setToDate(""); }}>Clear</Button>
          </div>
        </div>
      </Card>

      {/* Roles Table */}
      <Card>
        <Card.Body style={{ overflowX: "auto" }}>
          <Table responsive hover className="align-middle mb-0">
            <thead>
              <tr style={{ background: "#f2f2f2" }}>
                <th><Form.Check /></th>
                <th>Role</th>
                <th>Created Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRoles.length === 0 && <tr><td colSpan={5} className="text-center text-muted">No roles found</td></tr>}
              {filteredRoles.map(role => (
                <tr key={role.id} style={{ cursor: "pointer" }}>
                  <td><Form.Check /></td>
                  <td>{role.name}</td>
                  <td>{role.lastModified}</td>
                  <td>
                    <OverlayTrigger
                      overlay={<Tooltip>Click to mark {role.isActive ? "Inactive" : "Active"}</Tooltip>}
                    >
                      <span onClick={() => toggleRoleStatus(role.id)} style={{ background: role.isActive ? "#27ae60" : "#e74c3c", color: "#fff", padding: "4px 14px", borderRadius: 20, fontSize: 14, display: "inline-flex", alignItems: "center", gap: 6 }}>
                        <span style={{ width: 8, height: 8, background: "#fff", borderRadius: "50%" }}></span>
                        {role.isActive ? "Active" : "Inactive"}
                      </span>
                    </OverlayTrigger>
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                    <Button
                     size="sm"
                     onClick={() => handleView(c)}
                     title="View"
                     style={{
                       backgroundColor: "#00bfff",  // sky blue
                       borderColor: "#00bfff",
                       color: "#fff",
                     }}
                     variant=""  // variant hatana important hai, warna bootstrap override kar dega
                   >
                     <FaEye />
                   </Button>
                   
                   
                       {/* Pencil/Edit button - Yellow */}
                       <Button
                         size="sm"
                         onClick={() => handleEdit(c)}
                         title="Edit"
                         style={{
                           backgroundColor: "#f1c40f",  // yellow
                           borderColor: "#f1c40f",
                           color: "#fff",
                         }}
                       >
                         <FaEdit />
                       </Button>
                   
                       {/* Delete button - Red */}
                     <Button
                     size="sm"
                     onClick={() => handleDelete(c)}
                     title="Delete"
                     style={{
                       backgroundColor: "#e74c3c",  // red
                       borderColor: "#e74c3c",
                       color: "#fff",
                     }}
                     variant=""  // variant hatao ya empty string
                   >
                     <FaTrash />
                   </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Delete / View / Add / Edit modals are similar to before but with collapsible module sections */}
      {/* ...modals omitted for brevity, can reuse previous code and add Collapse for modules */}
    </div>
  );
};

export default RolesPermissions;

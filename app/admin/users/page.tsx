"use client";

import ClientWrap from "@/components/ClientWrap";
import { useEffect, useState } from "react";

export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const [editing, setEditing] = useState(null);

    useEffect(() => {
        fetch("/api/admin/list-users")
            .then(r => r.json())
            .then(data => setUsers(data.users));
    }, []);

    return (
        <ClientWrap minimiseHeader={true}>
            <div className="section-mid">
                <h2 className="text-2xl font-semibold mb-4">User Roles</h2>

                <table className="table-auto w-full border">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-2 border">Email</th>
                            <th className="p-2 border">UID</th>
                            <th className="p-2 border">Roles</th>
                            <th className="p-2 border">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((u: any) => (
                            <tr key={u.uid}>
                                <td className="p-2 border">{u.email}</td>
                                <td className="p-2 border">{u.uid}</td>
                                <td className="p-2 border">
                                    {Object.keys(u.claims).length === 0
                                        ? "None"
                                        : Object.keys(u.claims).join(", ")}
                                </td>
                                <td className="p-2 border">
                                    <button
                                        className="px-3 py-1 bg-blue-600 text-white rounded"
                                        onClick={() => setEditing(u)}
                                    >
                                        Edit Roles
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {editing && <EditRolesModal user={editing} onClose={() => setEditing(null)} />}
            </div>
        </ClientWrap>
    );
}

function EditRolesModal({ user, onClose }: any) {
    const [admin, setAdmin] = useState(!!user.claims.admin);
    const [tagEditor, setTagEditor] = useState(!!user.claims.tagEditor);

    const save = async () => {
        await fetch("/api/admin/set-claims", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                uid: user.uid,
                claims: { admin, tagEditor }
            })
        });

        alert("Roles updated. Refreshing…");
        window.location.reload();
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4">
                    Edit Roles for {user.email}
                </h2>

                <label className="flex items-center gap-2 mb-2">
                    <input type="checkbox" checked={admin} onChange={e => setAdmin(e.target.checked)} />
                    Admin
                </label>

                <label className="flex items-center gap-2 mb-4">
                    <input type="checkbox" checked={tagEditor} onChange={e => setTagEditor(e.target.checked)} />
                    Tag Editor
                </label>

                <div className="flex justify-end gap-2">
                    <button className="px-3 py-1 bg-gray-300 rounded" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="px-3 py-1 bg-green-600 text-white rounded" onClick={save}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

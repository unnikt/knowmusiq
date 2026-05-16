"use client"
import ClientWrap from "@/components/ClientWrap";
import { useEffect, useState } from "react";

export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState();
    const [editing, setEditing] = useState(null);

    useEffect(() => {
        fetch("/api/admin/list-users")
            .then(r => r.json())
            .then(data => setUsers(data.users));
    }, []);


    return (
        <ClientWrap >
            <p className="text-(--text)/80 p-2 mt-6">User list and rights</p>

            {/* Rows */}
            {users.map((u: any) => {
                const rights = Object.keys(u.claims);
                return (
                    <div className="p-4 bg-(--surface) rounded" key={u.email}>
                        <div key={u.email} className="flex p-2 items-center">
                            {/* User column */}
                            <button
                                onClick={() => { setUser(u); setEditing(true); }}>
                                <div className="w-1/3 text-(--primary)">{u.email}</div>
                            </button>
                            {/* Rights columns */}
                            <div className="flex flex-wrap">
                                {rights.length === 0
                                    ? <span>None</span>
                                    : rights.map((r, i) => (
                                        <span key={i} className="p-2">
                                            {r}
                                        </span>
                                    ))}
                            </div>
                        </div>
                    </div>
                );
            })}

            {editing && <EditRolesModal user={user} onClose={() => setEditing(null)} />}
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
            <div className="bg-(--surface) p-6 rounded shadow-lg w-96">
                <p className="text-xl mb-4">
                    Edit Rights
                </p>

                <p className="py-2">{user.email}</p>
                <p className="py-2 mb-4 text-sm text-(--text)/20 border-b">uid - {user.uid}</p>
                <label className="flex items-center gap-2 mb-2">
                    <input type="checkbox" checked={admin} onChange={e => setAdmin(e.target.checked)} />
                    Admin
                </label>

                <label className="flex items-center gap-2 mb-4">
                    <input type="checkbox" checked={tagEditor} onChange={e => setTagEditor(e.target.checked)} />
                    Tag Editor
                </label>

                <div className="flex justify-end gap-2">
                    <button className="btn bg-my-accent border-none" onClick={save}>
                        Save
                    </button>
                    <button className="btn" onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

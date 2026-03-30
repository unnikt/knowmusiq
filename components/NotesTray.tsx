"use client";

export default function NotesTray({ scale, selectedNote, setSelectedNote }) {
    return (
        <div className="flex flex-wrap gap-1 bg-slate-200 p-4">
            Notes:
            {scale.map(note => (
                <span
                    key={note}
                    onClick={() =>
                        setSelectedNote(prev => prev === note ? null : note)
                    }
                    className={`px-4 rounded-sm border border-slate-400 font-semibold  cursor-pointer
                        ${selectedNote === note ? "bg-my-secondary text-white" : ""}
                    `}
                >
                    {note}
                </span>
            ))}
        </div>
    );
}

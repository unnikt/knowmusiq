"use client";

export default function ChordsTray({ note, chords, selectedNote }) {
    // ⭐ CASE 1: No note selected → show ALL
    if (selectedNote === null) {
        return (
            <div className="bg-(--surface) p-2 border-b border-my-secondary">
                <p className="font-semibold">{note}</p>

                <div className="flex flex-wrap gap-2 text-sm">
                    {chords[note].map((chord: string, index: number) => (
                        <span key={index} className="p-2 rounded-sm bg-my-secondary/80">
                            {chord}
                        </span>
                    ))}
                </div>
            </div>
        );
    }

    // ⭐ CASE 2: A note is selected → show ONLY that note
    if (selectedNote === note) {
        return (
            <div className="bg-(--surface) p-2 border-b border-my-secondary">
                <p className="font-semibold">{note}</p>

                <div className="flex flex-wrap gap-2 text-sm">
                    {chords[note].map((chord: string, index: number) => (
                        <span key={index} className="p-2 rounded-sm bg-my-secondary/80">
                            {chord}
                        </span>
                    ))}
                </div>
            </div>
        );
    }

    // ⭐ CASE 3: Hide all others
    return null;
}

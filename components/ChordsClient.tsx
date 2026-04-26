"use client";

import { useState } from "react";
import NotesTray from "./NotesTray";
import ChordsTray from "./ChordsTray";

export default function RagaExplorer({ scale, chords }) {
    const [selectedNote, setSelectedNote] = useState<string | null>(null);

    return (
        <div className="space-y-4 p-2">
            <NotesTray
                scale={scale}
                selectedNote={selectedNote}
                setSelectedNote={setSelectedNote}
            />

            {/* ⭐ Show ALL if no note is selected */}
            {selectedNote === null &&
                scale.map((note: string) => (
                    <ChordsTray
                        key={note}
                        note={note}
                        chords={chords}
                        selectedNote={null}
                    />
                ))
            }

            {/* ⭐ Show ONLY the selected note */}
            {selectedNote !== null &&
                <ChordsTray
                    note={selectedNote}
                    chords={chords}
                    selectedNote={selectedNote}
                />
            }
        </div>
    );
}

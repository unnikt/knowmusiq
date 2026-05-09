"use client";

import { useState } from "react";
import ClientWrap from "@/components/ClientWrap";
import NotesTray from "@/components/TrayNotes";
import ChordsTray from "@/components/TrayChords";

export default function RagaExplorer({ scale, chords }) {
    const [selectedNote, setSelectedNote] = useState<string | null>(null);

    return (
        <ClientWrap>
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
        </ClientWrap>
    );
}

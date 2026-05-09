const SWARA_TO_OFFSET: Record<string, number> = {
    "S": 0,
    "R1": 1, "R2": 2, "R3": 3,
    "G1": 2, "G2": 3, "G3": 4,
    "M1": 5, "M2": 6,
    "P": 7,
    "D1": 8, "D2": 9, "D3": 10,
    "N1": 9, "N2": 10, "N3": 11,
};

const SWARAS = {
    S: "C",
    R1: "C#", R2: "D", R3: "D#",
    G1: "D", G2: "D#", G3: "E",
    M1: "F", M2: "F#",
    P: "G",
    D1: "G#", D2: "A", D3: "A#",
    N1: "A", N2: "A#", N3: "B",
};
const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

const uniq = (val: string, idx: number, self: string[]): boolean => self.indexOf(val) === idx;

function toNotes(swaras: string, tonic = "C") {

    const notes = swaras.split(" ").filter(uniq);
    const tonicIndex = NOTES.indexOf(tonic);

    // Remove final S repetition if present
    if (notes[notes.length - 1] === "S8") {
        notes.pop();
    }

    return notes.map(n => SWARAS[n] || n);
    // return notes.map(s => {
    //     const offset = SWARA_TO_OFFSET[s];
    //     return NOTES[(tonicIndex + offset) % 12];
    // });
}

function generateChords(scaleNotes: string[]) {
    const chords: Record<string, string[]> = {};

    for (let i = 0; i < scaleNotes.length; i++) {
        const root = scaleNotes[i];

        const third = scaleNotes[(i + 2) % scaleNotes.length];
        const fifth = scaleNotes[(i + 4) % scaleNotes.length];
        const seventh = scaleNotes[(i + 6) % scaleNotes.length];

        chords[root] = [
            `${root} triad: ${root} - ${third} - ${fifth}`,
            `${root}7: ${root} - ${third} - ${fifth} - ${seventh}`,
            `${root}sus2: ${root} - ${scaleNotes[(i + 1) % scaleNotes.length]} - ${fifth}`,
            `${root}sus4: ${root} - ${scaleNotes[(i + 3) % scaleNotes.length]} - ${fifth}`,
        ];
    }

    return chords;
}

export function getChords(arohana: string, avarohana: string, tonic = "C") {
    const notes = toNotes([arohana, avarohana].join(" "), tonic);
    const chords = generateChords(notes);

    return { scale: notes, chords };
}

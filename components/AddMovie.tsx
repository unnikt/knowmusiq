import { useState } from "react";
import Modal from "./Modal";
import TagPicker from "./TagPicker";
import YearPicker from "./YearPicker";
import { useUser } from "@/context/UserContext";
import { slugify } from "@/lib/string/slugify";
import getHeader from "@/lib/client/getHearder";

interface AddMovieProps {
    open?: boolean;
    onSave?: () => void;
    onCancel?: () => void;
}
export default function AddMovie({ open = false, onSave, onCancel }: AddMovieProps) {
    const { user, verifying } = useUser();

    const [message, setMessage] = useState("");
    const [movie, setMovie] = useState("");
    const [lang, setLang] = useState("");
    const [year, setYear] = useState("");
    const [showYear, setShowYear] = useState(false);
    const [dir, setDirector] = useState("");
    const [desc, setDescription] = useState("");
    function handleYearSelect(selectedYear: string) {
        setYear(selectedYear);
        setShowYear(false);
    }

    async function handleSave() {
        if (!movie) {
            setMessage("Please enter a movie name");
            return;
        }
        if (user?.uid === undefined) {
            setMessage("User not logged in");
            return;
        }

        // Create payload for API call
        const slug = slugify(movie);
        const payload = {
            db: "movies",
            doc_id: slug,
            data: {
                name: movie,
                slug: slug,
                year: year,
                dir: dir,
                desc: desc,
                lang: lang,
                idx: slug.substring(0, 3).toUpperCase(),
                updatedAt: new Date().toISOString(),
                uid: user?.uid || "unknown",
            },
        };

        setMessage("Saving movie..." + movie);
        // Call API to save movie
        fetch("/api/update", {
            method: "POST",
            headers: { "Content-Type": "application/json", ...await getHeader() },
            body: JSON.stringify(payload),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Movie saved:", data);
                setMessage("Movie saved successfully");
            })
            .catch((error) => {
                console.error("Error saving movie:", error);
                setMessage("Error saving movie");
            });

    }

    return (
        <Modal isOpen={open} title="Add Movie" w="80vw" h="90vh" onClose={() => onCancel && onCancel()}>
            <div className="card">
                {/* Movie name Input */}
                <div className="flex items-center gap-2">
                    <label className="w-30">Name</label>
                    <input
                        className="w-full border border-gray-400 rounded p-2"
                        placeholder="Enter value"
                        value={movie}
                        onChange={(e) => setMovie(e.target.value)}
                    />
                </div>
                {/* lang name Input */}
                <div className="flex items-center gap-2">
                    <label className="min-w-20">Language</label>
                    <TagPicker tag="lang" pValue=""
                        hidelabel={false} hideicon={false}
                        icon="language"
                        onSelect={(str) => setLang(str)}
                    />
                    <span className="value">
                        {lang}
                    </span>
                </div>

                {/* Year */}
                <div className="flex items-center gap-2">
                    <label className="min-w-20">Year</label>
                    <span className="btn-round-icon material-symbols-outlined"
                        onClick={() => setShowYear(!showYear)}
                    >calendar_month</span>
                    <span className="value">{year}</span>
                </div>
                <div
                    className={`${showYear ? 'flex' : 'hidden'} items-center gap-2  bg-(--surface2) p-2`}
                >
                    <YearPicker onSelect={(year) => handleYearSelect(year.toString())} />
                </div>

                {/* Director */}
                <div className="flex items-center gap-2">
                    <label className="min-w-20">Director</label>
                    <TagPicker tag="sing" pValue=""
                        icon="person_add"
                        hidelabel={false} hideicon={false}
                        onSelect={(director) => setDirector(director)} />
                    <span className="value">{dir}</span>
                </div>
                {/* Description */}

                <label className="w-30">Description</label>
                <input
                    className="w-full border border-gray-400 rounded p-2"
                    placeholder="Enter value"
                    value={desc}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <div>
                    <button className="btn btn-primary"
                        onClick={handleSave}>Save</button>
                </div>

                {message && <i className="text-red-600">{message}</i>}
            </div>

        </Modal>
    )
}
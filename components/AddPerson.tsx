import { useUser } from "@/context/UserContext";
import Modal from "./Modal";
import { useState } from "react";
import { slugify } from "@/lib/string/slugify";
import getHeader from "@/lib/client/getHearder";
import { Accordion } from "./Accordion";
import GetWikiName from "./GetWikiName";
import { Button } from "@headlessui/react";
import { usePersonLookup } from "@/hooks/usePersonLookup";
import RequestSignIn from "./RequestSignIn";


interface AddPersonProps {
    open?: boolean;
    onSave?: () => void;
    onCancel?: () => void;
}

export default function AddPerson({ open = false, onSave, onCancel }: AddPersonProps) {
    const { user, verifying } = useUser();
    const [message, setMessage] = useState("");
    const [saving, setSaving] = useState(false);

    const [person, setPerson] = useState("");
    const [gender, setGender] = useState("Male");
    const [pageid, setPageid] = useState("");

    const [pName, setTagValue] = useState("");
    const [pType, setTagType] = useState("Composer");
    const [thumbnail, setThumbnail] = useState("");
    const TAG_TYPES = [
        "Composer",
        "Singer",
        "Lyricist",
        "Movie",
        "Raga",
        "Tala",
        "Tempo",
        "Mood",
    ];

    const { results, loading, search } = usePersonLookup();


    function saveInfo(pageid: string, name: string, thumbnail?: string) {
        setPageid(pageid);
        setTagValue(name);
        setThumbnail(thumbnail);
        setMessage("");
    }

    async function handleSave() {
        setMessage("");
        if (!pType || !pName) return;

        const src = ["Composer", "Singer", "Lyricist"].includes(pType) ? "persons" : null;
        console.log("Determined src:", src, pType);

        if (!src) {
            setMessage("Tag type cannot be saved yet...");
            return;
        }
        setSaving(true);
        const doc_id = slugify(pName);

        // Create the body for the API request
        const body = {
            db: src,
            doc_id: doc_id,
            data: {
                name: pName,
                type: pType.slice(0, 4).toLowerCase(), // e.g. "comp" for "Composer" 
                idx: pName.toUpperCase().slice(0, 3), // first 3 letters for indexing
                slug: doc_id,
                gender: gender,
                wiki: pName, // Wikipedia title 
                pageid: pageid, // Wikipedia pageid
                thumbnail: thumbnail, // Wikipedia thumbnail
                updatedAt: new Date().toISOString(),
                user: user?.email || "Guest",
            },
        };

        // TODO: Save to Firestore
        // await addDoc(collection(db, "tags"), { type: tagType, value: tagValue });
        await fetch("/api/update", {
            method: "POST",
            headers: { "Content-Type": "application/json", ...await getHeader() },
            body: JSON.stringify(body),
        }).then((res) => {
            if (!res.ok) {
                setMessage("Error saving tag");
                throw new Error("Failed to save video");
            }
            else {
                setMessage(`${pType}: ${pName} saved`);
            }
        }).catch((err) => {
            console.error(err);
            setMessage("Error saving tag: " + err.message);
        });

        setSaving(false);
        setTagType("");
        setTagValue("");
    }

    if (verifying) {
        return (
            <p className="mt-8 text-center">Verifying user...    </p>
        );
    }

    if (!user) {
        return (
            <RequestSignIn message="Please sign in to add a new person..." />
        )
    }


    // async function handleSave() {
    //     if (!person) {
    //         setMessage("Please enter a person name");
    //         return;
    //     }
    //     if (user?.uid === undefined) {
    //         setMessage("User not logged in");
    //         return;
    //     }

    //     // Create the body for the API request
    //     const slug = slugify(person);
    //     const body = {
    //         db: "persons",
    //         doc_id: slug,
    //         data: {
    //             name: person,
    //             type: slug.slice(0, 4).toLowerCase(), // e.g. "comp" for "Composer" 
    //             idx: person.toUpperCase().slice(0, 3), // first 3 letters for indexing
    //             slug: slug,
    //             gender: gender,
    //             wiki: person, // Wikipedia title 
    //             pageid: pageid, // Wikipedia pageid
    //             thumbnail: thumbnail, // Wikipedia thumbnail
    //             updatedAt: new Date().toISOString(),
    //             user: user?.email || "Guest",
    //         },
    //     };

    //     setMessage("Saving person..." + person);
    //     console.log("Saving person with body:", body);
    //     return;

    //     // Call API to save person
    //     fetch("/api/update", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json", ...await getHeader() },
    //         body: JSON.stringify(body),
    //     })
    //         .then((response) => response.json())
    //         .then((data) => {
    //             console.log("Person saved:", data);
    //             setMessage("Person saved successfully");
    //         })
    //         .catch((error) => {
    //             console.error("Error saving person:", error);
    //             setMessage("Error saving person");
    //         });

    // }


    return (
        <Modal isOpen={open} title="Add Person" w="80vw" h="90vh" onClose={() => onCancel && onCancel()}>
            <div className="card">
                <Accordion title="Grab from Wikipedia?" state={true}>
                    <label className="block text-sm py-2">
                        People tags only, e.g. composers, singers, lyricists
                    </label>
                    <GetWikiName
                        onPageInfo={(pageid, name, thumbnail) => { saveInfo(pageid, name, thumbnail) }} pic={true} />
                </Accordion>
                {/* Tag Value Input */}
                <label className="block text-sm font-medium">
                    Tag Value
                </label>
                <input
                    className="w-full mt-1 border border-gray-400 rounded p-2"
                    placeholder="Enter value"
                    value={pName}
                    onChange={(e) => setTagValue(e.target.value)}
                />
                {/* Tag Type Dropdown */}
                <label className="block text-sm mt-2 font-medium ">
                    Tag Type
                </label>
                <select
                    className="w-full mt-1 outline-0 border border-gray-400 rounded p-2 bg-white text-slate-800"
                    value={pType}
                    onChange={(e) => setTagType(e.target.value)}
                >
                    <option value="">Select tag type</option>
                    {TAG_TYPES.map((t) => (
                        <option key={t} value={t}>
                            {t}
                        </option>
                    ))}
                </select>
                <Button
                    onClick={() => { search(pName).then(res => console.log("Results:", results)).catch(err => console.log(err)) }}
                    disabled={loading}
                    className="mt-2 btn hidden"
                >
                    {loading ? "Searching..." : "Search Wikipedia"}
                </Button>

                <div className="flex items-center gap-6 my-1 p-2 rounded">
                    {["Male", "Female", "Other"].map((g) => (
                        <label key={g} className="flex items-center gap-2 cursor-pointer text-(--text) ">
                            <input
                                type="radio"
                                name="gender"
                                value={g}
                                checked={gender === g}
                                onChange={(e) => setGender(e.target.value)}
                                className="h-4 w-4 text-(--primary) focus:ring-(--primary)"
                            />
                            <span >{g}</span>
                        </label>
                    ))}
                </div>

                {/* Save Button */}
                <div className="flex items-center ">
                    <button
                        onClick={handleSave}
                        disabled={saving || !pType || !pName}
                        className="btn bg-my-primary w-1/3 text-white  disabled:bg-gray-400"
                    >
                        {saving ? "Saving..." : "Save Tag"}
                    </button>
                    {message && <span className="text-green-600">{message} </span>}
                </div>

                {/* <div>
                    <button className="btn"
                        onClick={handleSave}>Save</button>
                </div> */}
            </div>

        </Modal>

    )
}
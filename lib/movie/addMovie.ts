// export async function addMovie(movie: string) {

//     // Add to list, send to API, etc.
//     await fetch("/api/update", {
//         method: "POST",
//         headers: { "Content-Type": "application/json", ...await getHeader() },
//         body: JSON.stringify({
//             db: src,
//             doc_id: doc_id,
//             data: {
//                 wiki: name,
//             },
//         }),
//     }).then((res) => {
//         if (!res.ok) {
//             throw new Error("Failed to save video");
//         }
//         else {
//             if (onSuccess) onSuccess(`Document ${src}: ${doc_id} updated successfully`);
//             router.push(`/persons/${doc_id}`)
//         }
//     }).catch((err) => {
//         console.error(err);
//         alert("Error saving video: " + err.message);
//     });

// };

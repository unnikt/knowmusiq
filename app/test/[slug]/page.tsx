export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    console.log("typeof params:", typeof params)

    // Await it (Next.js 15 allows this)
    const resolved = await params
    console.log("await params:", resolved)

    return (
        <div>
            <h1>Slug: {resolved.slug}</h1>
        </div>
    )
}

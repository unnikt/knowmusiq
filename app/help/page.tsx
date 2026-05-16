import ClientWrap from "@/components/ClientWrap"

export default function HelpPage() {
    return (
        <ClientWrap>
            <div className="flex gap-10 p-4">
                <p className="pt-2">To add videos</p>
                <p>
                    1. Click the search icon <br />
                    2. Find a Raga <br />
                    3. Click the video icon on the Raga page <br />
                    4. Sign in using your Google account <br />
                    5. Paste the video url from Youtube <br />
                    6. Click save
                </p>
            </div>
        </ClientWrap >
    )
}
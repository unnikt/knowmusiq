import ClientWrap from "./ClientWrap";

export default function RequestSignIn({ message }: { message: string }) {
    return (
        <ClientWrap>
            <p className="mt-8">{message}</p>
            <button className="btn mt-4" onClick={() => { window.location.href = "/auth/signin" }}>
                Sign In
            </button>
        </ClientWrap>
    );
}
import { getStats } from "@/lib/database/getStats";

export default async function StatsPage() {
    const stats = await getStats();

    return (
        <div className="p-8">
            <h2 className="title py-2">Platform Stats</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <StatCard label="Ragas" value={stats.ragas} />
                <StatCard label="Videos" value={stats.videos} />
                <StatCard label="Persons" value={stats.persons} />
            </div>
        </div>
    );
}

function StatCard({ label, value }: { label: string; value: number }) {
    return (
        <div className="rounded p-6  bg-(--surface) ">
            <p className="p-2">{label}</p>
            <p className="p-2 text-4xl font-bold text-my-accent">{value}</p>
        </div>
    );
}

import NavBar from "@/app/ui/nav-bar";
import Footer from "@/app/ui/footer";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import { connectDB } from "@/app/lib/mongodb";
import User, { IUser } from "@/app/models/User";

export default async function CodesPage() {
	const session = await getServerSession(authOptions);
	if (!session?.user?.email) {
		redirect("/login");
	}
	await connectDB();
	const userDoc = await User.findOne({
		email: session.user.email,
	}).lean<IUser>();
	const codes: string[] = userDoc?.codes ?? [];

	return (
		<div className="flex min-h-screen flex-col">
			<NavBar />

			{/* Sticky title below navbar */}
			<div className="sticky top-16 z-10 bg-[#fcf7e9]/90 px-4 py-5 backdrop-blur sm:px-6">
				<div className="mx-auto max-w-6xl">
					<h1 className="text-center text-2xl font-semibold tracking-[0.15em] text-slate-900">
						Your Codes
					</h1>
				</div>
			</div>

			{/* Scrollable list */}
			<main className="mx-auto w-full max-w-6xl flex-1 overflow-y-auto px-4 py-6 sm:px-6">
				<div className="space-y-3">
					{codes.length === 0 && (
						<p className="text-sm text-slate-600">
							No codes yet. (Placeholder)
						</p>
					)}
					{codes.map((c, i) => (
						<div
							key={i}
							className="flex items-center justify-between rounded-md border border-slate-200 bg-white/80 px-4 py-3 shadow-sm"
						>
							<span className="text-sm font-medium text-slate-800 truncate">
								{c}
							</span>
							<button
								type="button"
								className="rounded-md bg-amber-900 px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-amber-950"
							>
								Go to code
							</button>
						</div>
					))}
				</div>
			</main>
			<Footer />
		</div>
	);
}

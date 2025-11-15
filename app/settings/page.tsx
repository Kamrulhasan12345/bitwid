import NavBar from "@/app/ui/nav-bar";
import Footer from "@/app/ui/footer";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
	const session = await getServerSession(authOptions);
	if (!session?.user?.email) {
		redirect("/login");
	}
	return (
		<div className="flex min-h-screen flex-col">
			<NavBar />
			<main className="mx-auto w-full max-w-xl flex-1 px-4 py-10">
				<h1 className="mb-8 text-center text-2xl font-semibold tracking-[0.15em] text-slate-900">
					Settings
				</h1>

				{/* Change Email */}
				<section className="mb-10">
					<h2 className="mb-3 text-sm font-medium text-slate-700">
						Change Email
					</h2>
					<div className="space-y-3">
						<label className="block text-sm text-slate-600" htmlFor="new-email">
							New email
						</label>
						<input
							id="new-email"
							type="email"
							placeholder="you@example.com"
							className="w-full rounded-md border border-slate-300 bg-white/90 p-2 text-sm text-slate-900 outline-none focus:border-amber-700 focus:ring-2 focus:ring-amber-600/40"
						/>
						<div className="pt-1">
							<button
								type="button"
								className="rounded-md bg-amber-900 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-amber-950"
							>
								Update Email
							</button>
						</div>
					</div>
				</section>

				{/* Change Password */}
				<section>
					<h2 className="mb-3 text-sm font-medium text-slate-700">
						Change Password
					</h2>
					<div className="space-y-3">
						<label
							className="block text-sm text-slate-600"
							htmlFor="current-password"
						>
							Current password
						</label>
						<input
							id="current-password"
							type="password"
							className="w-full rounded-md border border-slate-300 bg-white/90 p-2 text-sm text-slate-900 outline-none focus:border-amber-700 focus:ring-2 focus:ring-amber-600/40"
						/>
						<label
							className="block text-sm text-slate-600"
							htmlFor="new-password"
						>
							New password
						</label>
						<input
							id="new-password"
							type="password"
							className="w-full rounded-md border border-slate-300 bg-white/90 p-2 text-sm text-slate-900 outline-none focus:border-amber-700 focus:ring-2 focus:ring-amber-600/40"
						/>
						<label
							className="block text-sm text-slate-600"
							htmlFor="retype-password"
						>
							Retype new password
						</label>
						<input
							id="retype-password"
							type="password"
							className="w-full rounded-md border border-slate-300 bg-white/90 p-2 text-sm text-slate-900 outline-none focus:border-amber-700 focus:ring-2 focus:ring-amber-600/40"
						/>
						<div className="pt-1">
							<button
								type="button"
								className="rounded-md bg-amber-900 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-amber-950"
							>
								Update Password
							</button>
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</div>
	);
}

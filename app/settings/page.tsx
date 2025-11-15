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
			<main className="flex flex-1 items-center justify-center px-4 py-10">
				<h1 className="text-2xl font-semibold tracking-[0.15em] text-slate-900">
					Settings
				</h1>
			</main>
			<Footer />
		</div>
	);
}

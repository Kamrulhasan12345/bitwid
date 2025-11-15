"use client";

import { FormEvent, useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
	const router = useRouter();
	const { status } = useSession();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (status === "authenticated") router.replace("/");
	}, [status, router]);

	async function onSubmit(e: FormEvent) {
		e.preventDefault();
		setError(null);
		setLoading(true);
		const res = await signIn("credentials", {
			redirect: false,
			email,
			password,
		});
		setLoading(false);
		if (res?.error) {
			setError("Invalid email or password");
		} else {
			router.replace("/");
		}
	}

	return (
		<div className="flex min-h-[calc(100vh-0px)] items-center justify-center px-4 py-10">
			<div className="w-full max-w-sm">
				<h1 className="mb-6 text-center text-2xl font-semibold tracking-[0.15em] text-slate-900">
					Login
				</h1>
				<form onSubmit={onSubmit} className="space-y-5">
					<div>
						<label className="mb-1 block text-sm font-medium text-slate-700">
							Email
						</label>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							className="w-full rounded-md border border-slate-300 bg-white/90 p-2 text-sm text-slate-900 outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-500/40"
						/>
					</div>
					<div>
						<label className="mb-1 block text-sm font-medium text-slate-700">
							Password
						</label>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							className="w-full rounded-md border border-slate-300 bg-white/90 p-2 text-sm text-slate-900 outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-500/40"
						/>
					</div>
					{error && <p className="text-sm text-red-600">{error}</p>}
					<button
						type="submit"
						disabled={loading}
						className="w-full rounded-md bg-amber-700 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-amber-800 disabled:opacity-60 transition-colors"
					>
						{loading ? "Logging in..." : "Login"}
					</button>
				</form>
			</div>
		</div>
	);
}

"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function SignupPage() {
	const router = useRouter();
	const { status } = useSession();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [password2, setPassword2] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		if (status === "authenticated") router.replace("/");
	}, [status, router]);

	async function onSubmit(e: FormEvent) {
		e.preventDefault();
		setError(null);
		if (password !== password2) {
			setError("Passwords do not match");
			return;
		}
		setLoading(true);
		const res = await fetch("/api/signup", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password }),
		});
		setLoading(false);
		if (!res.ok) {
			const data = await res.json().catch(() => ({}));
			setError(data?.error || "Signup failed");
			return;
		}
		setSuccess(true);
		setTimeout(() => router.replace("/login"), 600);
	}

	return (
		<div className="flex min-h-[calc(100vh-0px)] items-center justify-center px-4 py-10">
			<div className="w-full max-w-sm">
				<h1 className="mb-6 text-center text-2xl font-semibold tracking-[0.15em] text-slate-900">
					Signup
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
					<div>
						<label className="mb-1 block text-sm font-medium text-slate-700">
							Re-type Password
						</label>
						<input
							type="password"
							value={password2}
							onChange={(e) => setPassword2(e.target.value)}
							required
							className="w-full rounded-md border border-slate-300 bg-white/90 p-2 text-sm text-slate-900 outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-500/40"
						/>
					</div>
					{error && <p className="text-sm text-red-600">{error}</p>}
					{success && (
						<p className="text-sm text-emerald-600">
							Signup successful! Redirecting…
						</p>
					)}
					<button
						type="submit"
						disabled={loading}
						className="w-full rounded-md bg-amber-900 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-amber-950 disabled:opacity-60 transition-colors"
					>
						{loading ? "Signing up..." : "Create account"}
					</button>
				</form>
			</div>
		</div>
	);
}

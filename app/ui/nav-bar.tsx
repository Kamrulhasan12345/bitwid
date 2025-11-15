"use client";

import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import UserMenu from "./user-menu";

export default function NavBar() {
	const { status } = useSession();
	const loggedIn = status === "authenticated";
	const [menuOpen, setMenuOpen] = useState(false);
	const avatarRef = useRef<HTMLButtonElement | null>(null);

	useEffect(() => {
		function handleClickAway(e: MouseEvent) {
			if (!menuOpen) return;
			const target = e.target as Node;
			if (
				avatarRef.current &&
				!avatarRef.current.contains(target) &&
				!document.getElementById("user-menu-popover")?.contains(target)
			) {
				setMenuOpen(false);
			}
		}
		document.addEventListener("mousedown", handleClickAway);
		return () => document.removeEventListener("mousedown", handleClickAway);
	}, [menuOpen]);

	return (
		<header className="sticky top-0 z-20 w-full border-b border-slate-200/60 bg-[#fcf7e9]/80 backdrop-blur supports-backdrop-filter:bg-[#fcf7e9]/60">
			<div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
				<div className="font-semibold tracking-[0.35em] text-slate-900 select-none">
					b i t w i d
				</div>

				<div className="flex items-center gap-3">
					{loggedIn ? (
						<div className="relative">
							<button
								ref={avatarRef}
								type="button"
								aria-haspopup="menu"
								aria-expanded={menuOpen}
								onClick={() => setMenuOpen((v) => !v)}
								className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 bg-white shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400"
								title="User menu"
							>
								<span className="sr-only">Open user menu</span>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="currentColor"
									className="h-5 w-5 text-slate-700"
								>
									<path d="M12 12c2.761 0 5-2.686 5-6s-2.239-6-5-6-5 2.686-5 6 2.239 6 5 6zm0 2c-4.418 0-8 2.239-8 5v3h16v-3c0-2.761-3.582-5-8-5z" />
								</svg>
							</button>
							<UserMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
						</div>
					) : (
						<div className="flex items-center gap-2">
							<a
								href="/login"
								className="rounded-md border border-slate-300 bg-white/90 px-3 py-1.5 text-sm font-medium text-slate-800 shadow-sm hover:bg-white"
							>
								Login
							</a>
							<a
								href="/signup"
								className="rounded-md bg-amber-900 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-amber-950 transition-colors"
							>
								Signup
							</a>
						</div>
					)}
				</div>
			</div>
		</header>
	);
}

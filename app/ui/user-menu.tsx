"use client";

import React from "react";
import { signOut } from "next-auth/react";

type Props = {
	open: boolean;
	onClose: () => void;
};

export default function UserMenu({ open, onClose }: Props) {
	if (!open) return null;
	return (
		<div
			id="user-menu-popover"
			role="menu"
			aria-label="User menu"
			className="absolute right-0 mt-2 w-44 overflow-hidden rounded-md border border-slate-200 bg-white shadow-lg"
		>
			<button
				type="button"
				className="w-full px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
				onClick={async () => {
					onClose();
					await signOut({ callbackUrl: "/login" });
				}}
				role="menuitem"
			>
				Logout
			</button>
			<button
				type="button"
				className="w-full px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
				onClick={onClose}
				role="menuitem"
			>
				See all codes
			</button>
			<button
				type="button"
				className="w-full px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
				onClick={onClose}
				role="menuitem"
			>
				Settings
			</button>
		</div>
	);
}

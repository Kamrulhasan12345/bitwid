"use client";

import { useState } from "react";

export default function Editor() {
	const [code, setCode] = useState<string>(
		"// Start typing your code here...\n"
	);
	return (
		<section className="w-full">
			<label className="mb-2 block text-sm font-medium text-slate-700">
				Code Editor
			</label>
			<textarea
				value={code}
				onChange={(e) => setCode(e.target.value)}
				placeholder="// Start typing your code here..."
				className="h-64 w-full resize-y rounded-lg border border-slate-300 bg-white/80 p-3 font-mono text-sm text-slate-800 shadow-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-300 md:h-80"
				spellCheck={false}
			/>
		</section>
	);
}

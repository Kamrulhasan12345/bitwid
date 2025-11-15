import "@/app/global.css";
import Providers from "@/app/ui/providers";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className="min-h-screen bg-[#fcf7e9] text-slate-800">
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}

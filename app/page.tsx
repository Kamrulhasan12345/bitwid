import Editor from "./ui/editor/editor";
import Output from "./ui/editor/output";
import RightPanel from "./ui/right-panel";
import Footer from "./ui/footer";
import NavBar from "./ui/nav-bar";

export default function Home() {
	return (
		<div className="flex min-h-screen flex-col">
			<NavBar />

			<main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6">
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
					{/* Left panel: Editor + Output */}
					<div>
						<Editor />
						<Output />
					</div>

					{/* Right panel: desktop only */}
					<RightPanel />
				</div>
			</main>

			<Footer />
		</div>
	);
}

import Navbar from "../ui/navbar";

function MainLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen w-screen bg-[#00011E]">
			<Navbar />
			<main className="flex-1 mt-10">{children}</main>
		</div>
	);
}

export default MainLayout;

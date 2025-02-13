import { Footer } from "../ui/footer";
import Navbar from "../ui/navbar";

function AppLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen w-screen bg-[#00011E]">
			<Navbar />
			<main className="flex-1 mt-10">{children}</main>
			<Footer />
		</div>
	);
}

export default AppLayout;

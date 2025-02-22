import { Footer } from "../ui/footer";
import Navbar from "../ui/navbar";

function AppLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen w-screen bg-[#121421] overflow-hidden">
			<Navbar />
			<main className="flex-1 mt-20">{children}</main>
			<Footer />
		</div>
	);
}

export default AppLayout;

import Navbar from "./components/ui/navbar";
const App = () => {
	return (
		<main className="h-screen w-screen bg-[#00011E]">
			<div className="container mx-auto">
				<Navbar />
			</div>
			<div className="flex items-center justify-center">
				<h1 className="text-2xl font-semibold text-white">Hello World</h1>
			</div>
		</main>
	);
};

export default App;

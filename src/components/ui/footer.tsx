export function Footer() {
	return (
		<footer className="bg-[#121421] border-t border-gray-800 mt-20 py-20 relative overflow-hidden">
			<div className="absolute -bottom-24 left-0 right-0 overflow-hidden pointer-events-none select-none">
				<div className="text-[400px] font-bold text-white/1 leading-none whitespace-nowrap">
					PINJOC
				</div>
			</div>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-50 relative">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-12">
					<div>
						<h2 className="text-2xl font-bold text-white mb-4">Pinj 🪙 c</h2>
					</div>

					<div>
						<h3 className="text-white font-semibold mb-4">Resources</h3>
						<ul className="space-y-3">
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Documentation
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Research
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-white transition-colors"
								>
									GitHub
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Brand Kit
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Audits
								</a>
							</li>
						</ul>
					</div>

					<div>
						<h3 className="text-white font-semibold mb-4">Data & Analytics</h3>
						<ul className="space-y-3">
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Block Analytics
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Dune
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Token Terminal
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-white transition-colors"
								>
									DeFi Llama
								</a>
							</li>
						</ul>
					</div>

					<div>
						<h3 className="text-white font-semibold mb-4">Community</h3>
						<ul className="space-y-3">
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Twitter
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Farcaster
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Discord
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Mirror
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</footer>
	);
}

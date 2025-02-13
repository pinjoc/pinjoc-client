import {
	AnimatedSpan,
	Terminal,
	TypingAnimation,
} from "@/components/ui/terminal";

function TerminalBoard() {
	return (
		<Terminal className="bg-[#16181A]">
			<TypingAnimation className="text-white">
				&gt; welcome to the pinjaman online (pinjoc)
			</TypingAnimation>

			<AnimatedSpan delay={1500} className="text-green-500">
				<span>✔ Fast</span>
			</AnimatedSpan>

			<AnimatedSpan delay={2000} className="text-green-500">
				<span>✔ Responsibility</span>
			</AnimatedSpan>

			<AnimatedSpan delay={2500} className="text-green-500">
				<span>✔ Transparent</span>
			</AnimatedSpan>

			<AnimatedSpan delay={3000} className="text-green-500">
				<span>✔ Best Partner</span>
			</AnimatedSpan>

			<AnimatedSpan delay={3500} className="text-green-500">
				<span>✔ Realtime</span>
			</AnimatedSpan>

			<AnimatedSpan delay={4000} className="text-green-500">
				<span>✔ Too Secure</span>
			</AnimatedSpan>

			<AnimatedSpan delay={4500} className="text-green-500">
				<span>✔ Seamless</span>
			</AnimatedSpan>

			<AnimatedSpan delay={5000} className="text-green-500">
				<span>✔ Decentralized</span>
			</AnimatedSpan>

			<AnimatedSpan delay={5500} className="text-green-500">
				<span>✔ Revolutionizing CLOB</span>
			</AnimatedSpan>

			<TypingAnimation delay={6500} className="text-red-600">
				Good luck everyone!
			</TypingAnimation>
		</Terminal>
	);
}

export default TerminalBoard;

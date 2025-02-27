export const placeOrderAbi = [
	{
		type: "function",
		name: "placeOrder",
		inputs: [
			{
				name: "_debtToken",
				type: "address",
				internalType: "address",
			},
			{
				name: "_collateralToken",
				type: "address",
				internalType: "address",
			},
			{
				name: "_amount",
				type: "uint256",
				internalType: "uint256",
			},
			{
				name: "_collateralAmount",
				type: "uint256",
				internalType: "uint256",
			},
			{
				name: "_rate",
				type: "uint256",
				internalType: "uint256",
			},
			{
				name: "_maturity",
				type: "uint256",
				internalType: "uint256",
			},
			{
				name: "_maturityMonth",
				type: "string",
				internalType: "string",
			},
			{
				name: "_maturityYear",
				type: "uint256",
				internalType: "uint256",
			},
			{
				name: "_lendingOrderType",
				type: "uint8",
				internalType: "enum LendingOrderType",
			},
		],
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "spender",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "value",
				type: "uint256",
			},
		],
		name: "approve",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "nonpayable",
		type: "function",
	},
];

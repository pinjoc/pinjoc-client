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
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint256",
				name: "orderId",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "address",
				name: "debtToken",
				type: "address",
			},
			{
				indexed: false,
				internalType: "address",
				name: "collateralToken",
				type: "address",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "rate",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "maturity",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "string",
				name: "maturityMonth",
				type: "string",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "maturityYear",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "enum LendingOrderType",
				name: "lendingOrderType",
				type: "uint8",
			},
			{
				indexed: false,
				internalType: "enum Status",
				name: "status",
				type: "uint8",
			},
		],
		name: "OrderPlaced",
		type: "event",
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

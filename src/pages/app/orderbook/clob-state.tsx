import React, { createContext, useContext, useReducer, Dispatch } from "react";

// Define State Type
interface State {
	fixedRate: number;
	maxAmount: number;
}

// Define Action Types
type Action =
	| { type: "SET_FIXED_RATE"; payload: number }
	| { type: "SET_MAX_AMOUNT"; payload: number };

// Define Context Type
interface CLOBStateContextType {
	state: State;
	dispatch: Dispatch<Action>;
}

// Initial State
const initialState: State = {
	fixedRate: 0,
	maxAmount: 100,
};

// Create Context with Default Value
const CLOBStateContext = createContext<CLOBStateContextType | undefined>(
	undefined,
);

// Reducer Function
const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case "SET_FIXED_RATE":
			return { ...state, fixedRate: action.payload };
		case "SET_MAX_AMOUNT":
			return { ...state, maxAmount: action.payload };
		default:
			return state;
	}
};

// Provider Component
export const CLOBStateProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<CLOBStateContext.Provider value={{ state, dispatch }}>
			{children}
		</CLOBStateContext.Provider>
	);
};

// Custom Hook to Use Global State
export const useCLOBState = (): CLOBStateContextType => {
	const context = useContext(CLOBStateContext);
	if (!context) {
		throw new Error("useCLOBState must be used within a CLOBStateProvider");
	}
	return context;
};

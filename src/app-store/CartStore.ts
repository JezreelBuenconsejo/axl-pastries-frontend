"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
	productId: number;
	name: string;
	sizeLabel: string;
	sizeFactor: number;
	unitPrice: number;
	quantity: number;
	image?: string;
	flavor?: string;
};

type CartState = {
	items: CartItem[];
	addItem: (item: CartItem) => void;
	updateQuantity: (productId: number, sizeFactor: number, quantity: number) => void;
	removeItem: (productId: number, sizeFactor: number) => void;
	clearCart: () => void;
};

export const useCartStore = create<CartState>()(
	persist(
		set => ({
			items: [],
			addItem: item =>
				set(state => {
					const existingIndex = state.items.findIndex(
						i => i.productId === item.productId && i.sizeFactor === item.sizeFactor
					);

					if (existingIndex > -1) {
						const updated = [...state.items];
						updated[existingIndex] = {
							...updated[existingIndex],
							quantity: updated[existingIndex].quantity + item.quantity
						};
						return { items: updated };
					}

					return { items: [...state.items, item] };
				}),
			updateQuantity: (productId, sizeFactor, quantity) =>
				set(state => ({
					items: state.items
						.map(item =>
							item.productId === productId && item.sizeFactor === sizeFactor ? { ...item, quantity } : item
						)
						.filter(item => item.quantity > 0)
				})),
			removeItem: (productId, sizeFactor) =>
				set(state => ({
					items: state.items.filter(item => !(item.productId === productId && item.sizeFactor === sizeFactor))
				})),
			clearCart: () => set({ items: [] })
		}),
		{
			name: "axl-cart"
		}
	)
);

"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle2, MapPin, ReceiptText, Truck } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import { useCartStore } from "@/app-store/CartStore";

const formatPeso = (value: number) => `₱${value.toLocaleString("en-PH")}`;

export default function OrderCompletePage() {
	const cartItems = useCartStore(state => state.items);

	const subtotal = useMemo(
		() => cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),
		[cartItems]
	);
	const isCartEmpty = cartItems.length === 0;
	const deliveryFee = isCartEmpty ? 0 : 120;
	const total = subtotal + deliveryFee;

	return (
		<section className="w-full bg-white">
			<div className="mx-auto flex max-w-[1200px] flex-col gap-10 px-5 py-14 lg:px-20">
				<div className="flex flex-col gap-4 rounded-3xl border border-main-purple/15 bg-gradient-to-r from-main-purple/10 via-white to-main-lightBlue/10 px-6 py-7 shadow-lg sm:px-10 sm:py-12">
					<div className="flex items-start gap-3">
						<div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-inner">
							<CheckCircle2 className="h-7 w-7 text-main-purple" />
						</div>
						<div className="space-y-2">
							<p className="text-sm font-semibold uppercase tracking-[0.2em] text-main-purple/80">Order complete</p>
							<h1 className="text-3xl font-bold sm:text-4xl">Delivery confirmed for Puerto Princesa City, Palawan</h1>
							<p className="max-w-3xl text-base text-fontColor-gray">
								This simulated confirmation shows how we wrap up an order. Deliveries are limited to{" "}
								<span className="font-semibold text-main-purple">Puerto Princesa City</span>; outside addresses are not
								currently accepted.
							</p>
						</div>
					</div>
					<div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-main-purple">
						<div className="flex items-center gap-2 rounded-full bg-white/80 px-4 py-2">
							<MapPin className="h-4 w-4" />
							<span>Drop-off: Puerto Princesa City, Palawan</span>
						</div>
						<div className="flex items-center gap-2 rounded-full bg-white/80 px-4 py-2">
							<Truck className="h-4 w-4" />
							<span>ETA: Today · 4:30 PM - 6:00 PM</span>
						</div>
					</div>
				</div>

				<div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
					<div className="space-y-6">
						<div className="rounded-2xl border border-main-purple/10 bg-white p-6 shadow-sm">
							<div className="flex items-start gap-3">
								<div className="flex h-11 w-11 items-center justify-center rounded-full bg-main-purple/10">
									<MapPin className="h-5 w-5 text-main-purple" />
								</div>
								<div className="space-y-2">
									<p className="text-sm font-semibold text-main-purple">Delivery address</p>
									<p className="text-lg font-bold">Puerto Princesa City, Palawan</p>
									<p className="text-sm text-fontColor-gray">
										We currently deliver exclusively within Puerto Princesa City. Orders with addresses outside the city
										will not be dispatched; please choose pickup or reach out to confirm availability.
									</p>
								</div>
							</div>
						</div>

						<div className="rounded-2xl border border-main-purple/10 bg-white p-6 shadow-sm">
							<p className="text-sm font-semibold text-main-purple">What happens next</p>
							<ul className="mt-3 space-y-2 text-sm text-fontColor-gray">
								<li>• Kitchen confirms your cake message and decor, then schedules the rider.</li>
								<li>• Rider will call when nearby. Please keep your phone reachable for smooth drop-off.</li>
								<li>• For pickups, bring a valid ID; our team will have your box ready at the counter.</li>
							</ul>
						</div>
					</div>

					<aside className="space-y-4">
						<div className="rounded-2xl border border-main-purple/10 bg-white p-6 shadow-sm">
							<div className="flex items-center justify-between">
								<h2 className="text-xl font-bold">Order recap</h2>
								<ReceiptText className="h-5 w-5 text-main-purple" />
							</div>
							<div className="mt-4 space-y-4">
								{isCartEmpty ? (
									<div className="rounded-xl bg-neutral-50 px-4 py-3 text-sm text-fontColor-gray">
										Your cart was empty, so this summary is a demo preview.
									</div>
								) : (
									cartItems.map(item => (
										<div
											key={`${item.productId}-${item.sizeFactor}`}
											className="flex items-start justify-between rounded-xl bg-neutral-50 px-4 py-3"
										>
											<div className="space-y-1">
												<p className="text-sm font-semibold">{item.name}</p>
												<p className="text-xs text-fontColor-gray">{item.sizeLabel}</p>
												{item.flavor && <p className="text-xs text-fontColor-gray">{item.flavor}</p>}
												<p className="text-xs text-fontColor-gray">Qty: {item.quantity}</p>
											</div>
											<p className="text-sm font-semibold text-main-purple">
												{formatPeso(item.unitPrice * item.quantity)}
											</p>
										</div>
									))
								)}
							</div>
							<div className="mt-6 space-y-2 text-sm text-gray-700">
								<div className="flex items-center justify-between">
									<span>Subtotal</span>
									<span>{formatPeso(subtotal)}</span>
								</div>
								<div className="flex items-center justify-between">
									<span>Delivery (Puerto Princesa)</span>
									<span>{formatPeso(deliveryFee)}</span>
								</div>
								<div className="flex items-center justify-between text-base font-bold text-main-purple">
									<span>Total paid</span>
									<span>{formatPeso(total)}</span>
								</div>
							</div>
						</div>

						<div className="rounded-2xl border border-main-purple/10 bg-main-purple/5 p-5 text-sm text-main-purple">
							<p className="font-semibold">Delivery area reminder</p>
							<p className="mt-1">
								If your address is outside Puerto Princesa City, we{"'"}ll switch you to pickup by default. Chat with us if
								you need help coordinating riders.
							</p>
						</div>

						<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
							<Button asChild className="w-full justify-center sm:w-auto">
								<Link href="/">Back to home</Link>
							</Button>
							<Button asChild  className="w-full justify-center bg-white border border-main-purple text-main-purple sm:w-auto">
								<Link href="/checkout">Return to checkout flow</Link>
							</Button>
						</div>
					</aside>
				</div>
			</div>
		</section>
	);
}

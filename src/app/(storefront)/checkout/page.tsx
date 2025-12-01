"use client";

import ContentWrapper from "@/components/common/content-wrapper/ContentWrapper";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle2, Clock3, MapPin, Receipt, Truck } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useCartStore } from "@/app-store/CartStore";

type Fulfillment = "delivery" | "pickup";

const formatPeso = (value: number) => `₱${value.toLocaleString("en-PH")}`;

export default function CheckoutPage() {
	const cartItems = useCartStore(state => state.items);
	const [fulfillment, setFulfillment] = useState<Fulfillment>("delivery");
	const isCartEmpty = cartItems.length === 0;
	const deliveryFee = isCartEmpty ? 0 : fulfillment === "delivery" ? 120 : 0;

	const totals = useMemo(() => {
		const subtotal = cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
		return {
			subtotal,
			deliveryFee,
			total: subtotal + deliveryFee
		};
	}, [deliveryFee, cartItems]);

	return (
		<section className="w-full bg-gradient-to-br from-main-purple/5 via-white to-main-lightBlue/10">
			<ContentWrapper className="my-16 w-full">
				<div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 rounded-3xl border border-main-purple/10 bg-white/80 p-6 shadow-xl backdrop-blur-sm lg:p-10">
					<header className="flex flex-col gap-4 border-b border-main-purple/10 pb-6 md:flex-row md:items-center md:justify-between">
						<div className="space-y-2">
							<p className="text-sm font-semibold uppercase tracking-[0.2em] text-main-purple/80">Checkout</p>
							<h1 className="text-3xl font-bold sm:text-4xl">Review your treats and delivery</h1>
							<p className="max-w-3xl text-base text-fontColor-gray">
								This static checkout previews how orders flow. We only deliver within{" "}
								<span className="font-semibold text-main-purple">Puerto Princesa City, Palawan</span>. Pickups are available
								from our kitchen if you prefer to swing by.
							</p>
						</div>
						<div className="flex items-center gap-2 rounded-full bg-main-purple/10 px-4 py-2 text-sm font-semibold text-main-purple">
							<MapPin className="h-4 w-4" />
							<span>Delivery zone locked: Puerto Princesa City</span>
						</div>
					</header>

					<div className="flex flex-col md:grid gap-8 lg:grid-cols-[1.6fr_1fr]">
						<div className="space-y-6 w-full">
							<section className="rounded-2xl border w-fit border-main-purple/10 bg-white p-6 shadow-sm">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-xs font-semibold uppercase tracking-[0.2em] text-main-purple/70">Step 1</p>
										<h2 className="text-xl font-bold">Contact details</h2>
									</div>
									<CheckCircle2 className="h-5 w-5 text-main-purple/70" />
								</div>
								<div className="mt-5 grid gap-4 sm:grid-cols-2">
									<label className="space-y-2 text-sm font-semibold text-gray-700">
										<span>Full name</span>
										<input
											className="w-full rounded-xl border border-main-purple/20 bg-white px-4 py-3 text-sm text-gray-900 shadow-inner focus:border-main-purple focus:outline-none"
											placeholder="Juan Dela Cruz"
										/>
									</label>
									<label className="space-y-2 text-sm font-semibold text-gray-700">
										<span>Phone number</span>
										<input
											className="w-full rounded-xl border border-main-purple/20 bg-white px-4 py-3 text-sm text-gray-900 shadow-inner focus:border-main-purple focus:outline-none"
											placeholder="+63 917 000 0000"
										/>
									</label>
									<label className="space-y-2 text-sm font-semibold text-gray-700 sm:col-span-2">
										<span>Email for updates</span>
										<input
											type="email"
											className="w-full rounded-xl border border-main-purple/20 bg-white px-4 py-3 text-sm text-gray-900 shadow-inner focus:border-main-purple focus:outline-none"
											placeholder="you@example.com"
										/>
									</label>
								</div>
							</section>

							<section className="rounded-2xl border border-main-purple/10 bg-white p-6 shadow-sm">
								<div className="flex items-center justify-between gap-3">
									<div>
										<p className="text-xs font-semibold uppercase tracking-[0.2em] text-main-purple/70">Step 2</p>
										<h2 className="text-xl font-bold">Fulfillment</h2>
									</div>
									<Truck className="h-5 w-5 text-main-purple/70" />
								</div>

								<div className="mt-4 grid gap-3 sm:grid-cols-2">
									{(["delivery", "pickup"] as Fulfillment[]).map(option => (
										<Button
											key={option}
											type="button"
											variant="none"
											className={cn(
												"flex w-full flex-col items-start rounded-xl border px-4 py-4 text-left transition",
												"hover:border-main-purple/70 hover:shadow-sm",
												option === fulfillment
													? "border-main-purple bg-main-purple/10 shadow-sm"
													: "border-main-purple/20 bg-white"
											)}
											onClick={() => setFulfillment(option)}
										>
											<div className="flex w-full items-center justify-between">
												<span className="text-base font-semibold capitalize">{option}</span>
												{option === fulfillment && <CheckCircle2 className="h-4 w-4 text-main-purple" />}
											</div>
											<p className="mt-1 text-sm text-fontColor-gray text-wrap">
												{option === "delivery"
													? "We deliver within Urban Puerto Princesa City."
													: "Pickup from our home bakery on 116 Andres Road, Bgy. San Pedro, Puerto Princesa."}
											</p>
										</Button>
									))}
								</div>
								<div className="mt-4 flex items-center gap-3 rounded-xl bg-main-purple/5 px-4 py-3 text-sm text-main-purple">
									<Clock3 className="h-4 w-4" />
									<span>Next available window: today, 3:00 PM – 6:00 PM.</span>
								</div>
							</section>

							<section className="rounded-2xl border border-main-purple/10 bg-white p-6 shadow-sm">
								<div className="flex items-center justify-between gap-3">
									<div>
										<p className="text-xs font-semibold uppercase tracking-[0.2em] text-main-purple/70">Step 3</p>
										<h2 className="text-xl font-bold">Delivery details</h2>
									</div>
									<MapPin className="h-5 w-5 text-main-purple/70" />
								</div>

								<div className="mt-5 grid gap-4 sm:grid-cols-2">
									<label className="space-y-2 text-sm font-semibold text-gray-700 sm:col-span-2">
										<span>Address (Puerto Princesa City only)</span>
										<input
											disabled={fulfillment === "pickup"}
											className="w-full rounded-xl border border-main-purple/20 bg-white px-4 py-3 text-sm text-gray-900 shadow-inner focus:border-main-purple focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-50"
											placeholder="House No., Street, Barangay"
										/>
									</label>
									<label className="space-y-2 text-sm font-semibold text-gray-700">
										<span>City</span>
										<select
											disabled
											className="w-full rounded-xl border border-main-purple/20 bg-white px-4 py-3 text-sm text-gray-900 shadow-inner focus:border-main-purple focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-50"
											defaultValue="Puerto Princesa City"
										>
											<option>Puerto Princesa City</option>
										</select>
									</label>
									<label className="space-y-2 text-sm font-semibold text-gray-700">
										<span>Province</span>
										<select
											disabled
											className="w-full rounded-xl border border-main-purple/20 bg-white px-4 py-3 text-sm text-gray-900 shadow-inner focus:border-main-purple focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-50"
											defaultValue="Palawan"
										>
											<option>Palawan</option>
										</select>
									</label>
									<label className="space-y-2 text-sm font-semibold text-gray-700 sm:col-span-2">
										<span>Order notes</span>
										<textarea
											rows={3}
											className="w-full rounded-xl border border-main-purple/20 bg-white px-4 py-3 text-sm text-gray-900 shadow-inner focus:border-main-purple focus:outline-none"
											placeholder="Add messages for the rider or cake dedication."
										/>
									</label>
								</div>
								<p className="mt-4 text-sm text-main-purple">
									Our routes are set for Puerto Princesa City, Palawan. For nearby areas, please call before placing an
									order so we can confirm if we can accommodate.
								</p>
							</section>
						</div>

						<aside className="space-y-4">
							<div className="rounded-2xl border border-main-purple/10 bg-white p-6 shadow-sm">
								<div className="flex items-center justify-between">
									<h3 className="text-xl font-bold">Order summary</h3>
									<Receipt className="h-5 w-5 text-main-purple/70" />
								</div>
								<div className="mt-4 space-y-4">
									{isCartEmpty ? (
										<div className="rounded-xl bg-neutral-50 px-4 py-3 text-sm text-fontColor-gray">
											Your cart is empty. Add a cake or dessert to proceed.
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
										<span>{formatPeso(totals.subtotal)}</span>
									</div>
									<div className="flex items-center justify-between">
										<span>Delivery (Puerto Princesa)</span>
										<span>{deliveryFee === 0 ? "N/A" : formatPeso(deliveryFee)}</span>
									</div>
									<div className="flex items-center justify-between text-base font-bold text-main-purple">
										<span>Total</span>
										<span>{formatPeso(totals.total)}</span>
									</div>
								</div>
								<Button asChild className="mt-6 w-full justify-center" disabled={isCartEmpty}>
									<Link href={isCartEmpty ? "/cakes" : "/order-complete"}>{isCartEmpty ? "Add items to continue" : "Complete order (demo)"}</Link>
								</Button>
								<p className="mt-3 text-center text-xs text-fontColor-gray">
									This flow is a static preview—no payment will be collected.
								</p>
							</div>

							<div className="rounded-2xl border border-main-purple/10 bg-main-purple/5 p-5 text-sm text-main-purple">
								<p className="font-semibold">Delivery area reminder</p>
								<p className="mt-1">
									Orders are fulfilled only within Puerto Princesa City, Palawan. Choose pickup if you{"'"}re visiting or
									prefer collecting your treats yourself.
								</p>
							</div>
						</aside>
					</div>
				</div>
			</ContentWrapper>
		</section>
	);
}

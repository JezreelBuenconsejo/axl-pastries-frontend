"use client";

import { useState, useMemo, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetProductDetails } from "@/hooks/useProductDetails";
import { useToast } from "@/hooks/use-toast";
import { useCartStore, CartItem } from "@/app-store/CartStore";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShoppingCart } from "lucide-react";

const SIZE_OPTIONS = [
	{ factor: 1, label: "6 inches" },
	{ factor: 1.5, label: "7 inches" },
	{ factor: 2, label: "8 inches" },
	{ factor: 3, label: "10 inches" }
];

const ProductPageComponent = () => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const { toast } = useToast();
	const addItem = useCartStore(state => state.addItem);

	// Get product ID from query parameters
	const productId = useMemo(() => {
		const id = searchParams.get("id");
		if (!id) {
			router.replace("/404"); // Redirect to 404 if no product ID
		}
		return Number(id);
	}, [searchParams, router]);

	// Fetch product details using a custom hook
	const { product, loading, error } = useGetProductDetails(productId);

	// State for size and quantity
	const [quantity, setQuantity] = useState(1);
	const [size, setSize] = useState(SIZE_OPTIONS[0]);

	// Calculate price
	const basePrice = useMemo(() => product?.base_price ?? 0, [product]);
	const price = useMemo(() => basePrice * size.factor * quantity, [basePrice, size.factor, quantity]);
	const images: string[] = useMemo(
		() => [...(product?.featured_image_url ? [product.featured_image_url] : []), ...(product?.images ?? [])],
		[product]
	);

	// Handlers for size and quantity
	const handleSizeChange = (factor: number) => {
		const selectedSize = SIZE_OPTIONS.find(option => option.factor === factor);
		if (selectedSize) setSize(selectedSize);
	};

	const handleQuantityChange = (newQuantity: number) => setQuantity(newQuantity);

	const handleAddToCart = () => {
		if (!product?.id || !product.name) {
			toast({
				title: "Unable to add to cart",
				description: "This product is unavailable right now."
			});
			return;
		}

		const unitPrice = basePrice * size.factor;
		const cartItem: CartItem = {
			productId: product.id,
			name: product.name,
			sizeLabel: size.label,
			sizeFactor: size.factor,
			unitPrice,
			quantity,
			image: images[0]
		};

		try {
			addItem(cartItem);

			toast({
				title: "Added to cart",
				description: `${cartItem.name} (${cartItem.sizeLabel}) × ${cartItem.quantity} added.`
			});
		} catch (err) {
			console.error("Failed to update cart", err);
			toast({
				title: "Something went wrong",
				description: "Please try again in a moment."
			});
		}
	};

	// Loading and error handling
	if (loading) return <div className="min-h-[calc(100vh-455px)]">Loading...</div>;
	if (error) return <div className="min-h-[calc(100vh-455px)]">Error: {error}</div>;

	return (
		<section className="min-h-[calc(100vh-455px)] w-full p-6 px-5 lg:px-20">
			<h1 className="text-center text-4xl font-bold">{product?.name}</h1>
			<h3 className="mb-5 text-center text-xl font-medium italic">{product?.category_name}</h3>
			<div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
				{/* Carousel */}
				<Carousel className="w-full" thumbnails={images}>
					<div className="border-2 py-4">
						<CarouselContent>
							{images.map((item, index) => (
								<CarouselItem key={index} className="flex h-96 w-full items-center justify-center">
									<img
										src={item}
										alt={`Product ${index + 1}`}
										className="max-h-full w-auto object-contain px-4"
									/>
								</CarouselItem>
							))}
						</CarouselContent>
					</div>
				</Carousel>

				{/* Product Details */}
				<div className="flex flex-col gap-4 font-medium">
					<div className="text-base leading-5">
						<p>{product?.description}</p>
						<p className="mt-1.5 italic">Price Starts at P{basePrice}</p>
					</div>
					<span>Flavor: {product?.flavor}</span>
					{/* Size Selector */}
					<div className="flex items-center gap-3">
						<span>Selected size: {size.label}</span>
						<Select onValueChange={value => handleSizeChange(parseFloat(value))}>
							<SelectTrigger className="w-32">
								<SelectValue placeholder={size.label} />
							</SelectTrigger>
							<SelectContent>
								{SIZE_OPTIONS.map(option => (
									<SelectItem key={option.factor} value={String(option.factor)}>
										{option.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					{/* Quantity Selector */}
					<div className="flex items-center gap-4">
						<Button
							className="px-4 py-2"
							onClick={() => handleQuantityChange(Math.max(quantity - 1, 1))}
							disabled={quantity === 1}
						>
							-
						</Button>
						<span className="w-5 text-center">{quantity}</span>
						<Button className="px-4 py-2" onClick={() => handleQuantityChange(quantity + 1)}>
							+
						</Button>
					</div>

					{/* Price and add to cart */}
					<div className="flex flex-col gap-3">
						<div className="text-xl font-bold">Price: P{price}</div>
						<Button className="w-full sm:w-fit" onClick={handleAddToCart}>
							<ShoppingCart className="mr-2 h-4 w-4" />
							Add to cart
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
};

const ProductPage: React.FC = () => {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<ProductPageComponent />
		</Suspense>
	);
};

export default ProductPage;

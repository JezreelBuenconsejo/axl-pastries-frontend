import Cake from "~/public/assets/images/category/cake.png";
import Muffins from "~/public/assets/images/category/muffins.png";
import Cupcake from "~/public/assets/images/category/cupcakes.png";
import Desserts from "~/public/assets/images/category/macaroons.png";

export const CategoriesList = [
	{
		name: "Cake",
		path: "/",
		description:
			"Cakes are our main pride. Many flavors and combinations for everyone. A large selection of delicious cakes for different tastes!",
		imageURL: Cake.src
	},
	{
		name: "Desserts",
		path: "/",
		description: "A large selection of desserts for different tastes! Enjoy with the whole family.",
		imageURL: Desserts.src
	},
	{
		name: "Cupcakes",
		path: "/",
		description: "A good selection of various cakes. It tastes good after a hard day's work. Try it!",
		imageURL: Cupcake.src
	},
	{
		name: "Maffins",
		path: "/",
		description: "Muffins are a good snack in the middle of the day. Make yourself a holiday even on weekdays!",
		imageURL: Muffins.src
	}
];

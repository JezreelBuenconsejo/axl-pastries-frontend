import Cake from "~/public/assets/images/category/cake.png";
import Cupcake from "~/public/assets/images/category/cupcakes.png";

export const CategoriesList = [
	{
		name: "Cake",
		path: "/cakes",
		description:
			"Cakes are our main pride. Many flavors and combinations for everyone. A large selection of delicious cakes for different tastes!",
		imageURL: Cake.src
	},
	{
		name: "Cupcakes",
		path: "/cupcakes",
		description: "A good selection of various cakes. It tastes good after a hard day's work. Try it!",
		imageURL: Cupcake.src
	}
];

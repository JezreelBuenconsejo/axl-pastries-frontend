export interface Cake {
	id?: number;
	name: string;
	flavor: string;
	base_price: number;
	description?: string;
	featured_image_url?: string;
	images?: string[];
	category_id: number;
	category_name?: string;
	created_at?: string;
	updated_at?: string;
}

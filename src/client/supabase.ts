import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://udhssyojctlyqegnhaoy.supabase.co";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const handleOAuth = async (
	provider: "google" | "facebook",
	redirectTo: string,
	onError: (message: string) => void
  ) => {
	try {
	  const { data, error } = await supabase.auth.signInWithOAuth({
		provider,
		options: { redirectTo },
	  });
	  if (error) {
		onError(error.message);
		throw new Error(error.message);
	  }
	  if (data?.url) {
		// Redirect the user to the OAuth provider's URL
		window.location.href = data.url;
	  } else {
		onError("OAuth flow did not provide a URL.");
	  }
	} catch (err: unknown) {
	  if (err instanceof Error) {
		onError(err.message);
	  } else {
		onError("An unknown error occurred.");
	  }
	}
  };
  

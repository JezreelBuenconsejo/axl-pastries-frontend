import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://udhssyojctlyqegnhaoy.supabase.co"; // Add these to your .env file
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const handleOAuth = async (
	provider: "google" | "facebook",
	redirectTo: string,
	onSuccess: (token: string, username: string) => void,
	onError: (message: string) => void
) => {
	try {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider,
			options: { redirectTo }
		});

		if (error) {
			throw new Error(error.message);
		}

		if (data?.url) {
			const popup = window.open(data.url, "OAuth Login", "width=500,height=600");

			if (popup) {
				const timer = setInterval(async () => {
					try {
						if (popup.closed) {
							clearInterval(timer);
							const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
							if (sessionError) {
								onError(sessionError.message);
							} else if (sessionData?.session) {
								const token = sessionData.session.access_token;
								const username = sessionData.session.user?.email || provider + " User";
								onSuccess(token, username);
							}
						}
					} catch (err) {
						console.error(err);
					}
				}, 500);
			}
		}
	} catch (err: unknown) {
		if (err instanceof Error) {
			onError(err.message);
		} else {
			onError("An unknown error occurred.");
		}
	}
};

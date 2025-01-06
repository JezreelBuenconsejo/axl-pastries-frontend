// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { FacebookAuthProvider, getAuth, GoogleAuthProvider, sendEmailVerification } from "firebase/auth";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyAw2WroZekSl8APm8fAnwUkxIRH9nQsuoA",
	authDomain: "axl-pastries-4a7a0.firebaseapp.com",
	projectId: "axl-pastries-4a7a0",
	storageBucket: "axl-pastries-4a7a0.firebasestorage.app",
	messagingSenderId: "992717802199",
	appId: "1:992717802199:web:6c568c0dd4b81939f53e92",
	measurementId: "G-EFVBTMHZTF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
//const analytics = getAnalytics(app);

export const sendVerificationEmail = async () => {
	if (auth.currentUser) {
		const actionCodeSettings = {
			url: "http://localhost:3000/", // Replace with your Netlify URL
			handleCodeInApp: true // Open in the same application
		};

		try {
			await sendEmailVerification(auth.currentUser, actionCodeSettings);
			console.log("Verification email sent!");
		} catch (error) {
			console.error("Error sending email verification:", error);
		}
	}
};

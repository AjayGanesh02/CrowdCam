import {
	collection,
	getDocs,
	query,
} from "firebase/firestore";

import { db } from "@/src/lib/firebase/firebase";

export async function getRestaurants (filters = {}) {
	let q = query(collection(db, "events"));

	const results = await getDocs(q);
	console.log(results);
	return results.docs.map(doc => {
		return {
			id: doc.id,
			...doc.data(),
		};
	});
}
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string | undefined;

if (!MONGODB_URI) {
	// Intentionally throw at runtime if missing
	// to signal required environment variable.
	// Do not log secrets.
}

type MongooseGlobal = typeof globalThis & {
	_mongooseConn?: typeof mongoose | null;
	_mongoosePromise?: Promise<typeof mongoose> | null;
};

const globalWithMongoose = global as MongooseGlobal;

export async function connectDB() {
	if (globalWithMongoose._mongooseConn) return globalWithMongoose._mongooseConn;

	if (!globalWithMongoose._mongoosePromise) {
		if (!MONGODB_URI) throw new Error("MONGODB_URI is not set");
		globalWithMongoose._mongoosePromise = mongoose
			.connect(MONGODB_URI, {
				// keep options minimal; use defaults for Mongoose v7+
			})
			.then((m) => m);
	}

	globalWithMongoose._mongooseConn = await globalWithMongoose._mongoosePromise;
	return globalWithMongoose._mongooseConn;
}

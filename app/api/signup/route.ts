import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { connectDB } from "@/app/lib/mongodb";
import User from "@/app/models/User";

export async function POST(req: Request) {
	try {
		const body = await req.json().catch(() => null);
		const emailRaw = body?.email as string | undefined;
		const password = body?.password as string | undefined;

		if (!emailRaw || !password) {
			return NextResponse.json(
				{ error: "Email and password required" },
				{ status: 400 }
			);
		}

		const email = emailRaw.toLowerCase().trim();

		if (password.length < 6) {
			return NextResponse.json(
				{ error: "Password must be at least 6 characters" },
				{ status: 400 }
			);
		}

		await connectDB();

		const existing = await User.findOne({ email }).lean();
		if (existing) {
			return NextResponse.json(
				{ error: "Email already in use" },
				{ status: 409 }
			);
		}

		const passwordHash = await bcrypt.hash(password, 10);
		await User.create({ email, passwordHash });

		return NextResponse.json({ success: true }, { status: 201 });
	} catch (err) {
    console.log(err)
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}

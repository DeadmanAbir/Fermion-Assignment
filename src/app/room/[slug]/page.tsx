"use client";
import React from "react";
import { useParams } from "next/navigation";

export default function RoomPage() {
	const params = useParams();
	const slug = params?.slug;

	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
			<div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full flex flex-col items-center">
				<h1 className="text-3xl font-bold text-indigo-600 mb-4">
					Room: <span className="text-gray-800">{slug}</span>
				</h1>
				<p className="text-gray-500">Welcome to your room page!</p>
			</div>
		</div>
	);
}

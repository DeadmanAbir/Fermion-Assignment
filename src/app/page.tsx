"use client";
import { useState, ChangeEvent, FormEvent, useCallback } from "react";

export default function Home() {
	const [formData, setFormData] = useState({
		email: "",
		roomId: "",
	});

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[id]: value,
		}));
	};

	const handleSubmit = useCallback(
		(e: FormEvent) => {
			e.preventDefault();
			console.log(formData);
			// Add your form submission logic here
		},
		[formData]
	);

	return (
		<div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
			<div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
				<h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
					Join Room
				</h1>

				<form onSubmit={handleSubmit} className="space-y-6 text-black">
					<div>
						<label htmlFor="email" className="block text-sm font-medium  mb-1">
							Email
						</label>
						<input
							type="email"
							id="email"
							value={formData.email}
							onChange={handleInputChange}
							className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Enter your email"
							required
						/>
					</div>

					<div>
						<label htmlFor="roomId" className="block text-sm font-medium  mb-1">
							Room ID
						</label>
						<input
							type="text"
							id="roomId"
							value={formData.roomId}
							onChange={handleInputChange}
							className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Enter room ID"
							required
						/>
					</div>

					<button
						type="submit"
						className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
					>
						Join Room
					</button>
				</form>
			</div>
		</div>
	);
}

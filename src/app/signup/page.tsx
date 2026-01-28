"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, Mail, Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

export default function SignupPage() {
    const router = useRouter();
    const [sedangMemuat, setSedangMemuat] = useState(false);
    const [tampilPassword, setTampilPassword] = useState(false);
    const [namaLengkap, setNamaLengkap] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSedangMemuat(true);

        try {
            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: namaLengkap,
                    },
                },
            });

            if (error) {
                alert(error.message);
            } else {
                alert("Registration successful! Please check your email for verification.");
                router.push("/login");
            }
        } catch (error: any) {
            alert("An unexpected error occurred");
        } finally {
            setSedangMemuat(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">

            <div className="pt-24 pb-12 px-4 flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">

                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 w-full max-w-md">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Account</h1>
                        <p className="text-gray-500 text-sm">Join us to start your wellness journey</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    required
                                    placeholder="John Doe"
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                    value={namaLengkap}
                                    onChange={(e) => setNamaLengkap(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    required
                                    placeholder="you@example.com"
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type={tampilPassword ? "text" : "password"}
                                    required
                                    placeholder="Create a password"
                                    className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setTampilPassword(!tampilPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none p-1"
                                >
                                    {tampilPassword ? (
                                        <EyeOff className="w-4 h-4" />
                                    ) : (
                                        <Eye className="w-4 h-4" />
                                    )}
                                </button>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">Must be at least 8 characters long</p>
                        </div>

                        <Button
                            type="submit"
                            disabled={sedangMemuat}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 rounded-xl text-base font-semibold shadow-lg shadow-blue-600/20 transition-all hover:scale-[1.02] active:scale-[0.98] mt-2"
                        >
                            {sedangMemuat ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                    Creating account...
                                </>
                            ) : (
                                "Sign Up"
                            )}
                        </Button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                        <p className="text-gray-500 text-sm">
                            Already have an account?{" "}
                            <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

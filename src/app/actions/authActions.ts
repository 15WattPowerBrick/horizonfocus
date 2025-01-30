"use server";

import { signIn, signOut } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { signInSchema, signUpSchema } from "@/lib/zod";
import bcryptjs from "bcryptjs";

// Handle Google Sign-In
export async function handleGoogleSignIn() {
  await signIn("google", { redirectTo: "/dashboard" });
}

// Handle Sign Out
export async function handleSignOut() {
  await signOut();
}

// Fetch user from the database by email
export async function getUserFromDb(email: string) {
  try {
    return await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        password: true, // Password is included but used only in login()
        createdAt: true,
        updatedAt: true,
      },
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

// Handle Login
export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    // Validate input schema
    signInSchema.parse({ email, password });

    const user = await getUserFromDb(email);

    if (!user) {
      return { success: false, message: "User not found. Please register." };
    }

    if (!user.password) {
      return {
        success: false,
        message: "User registered with Google. Use Google sign-in.",
      };
    }

    // Compare passwords
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return { success: false, message: "Incorrect password. Try again." };
    }

    await signIn("credentials", { redirect: false, email, password });

    return { success: true, message: "Signed in successfully." };
  } catch (error) {
    console.error("Error during sign-in:", error);
    return {
      success: false,
      message: "Login failed. Check credentials and try again.",
    };
  }
}

// Handle User Registration
export async function register({
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
}: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}) {
  try {
    // Validate input schema
    signUpSchema.parse({
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    });

    // Check if user already exists
    const existingUser = await getUserFromDb(email);
    if (existingUser) {
      return {
        success: false,
        message: "User already exists. Sign in instead.",
      };
    }

    // Hash password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create user
    await prisma.user.create({
      data: { firstName, lastName, email, password: hashedPassword },
    });

    return { success: true, message: "Account created successfully." };
  } catch (error) {
    console.error("Error during registration:", error);
    return { success: false, message: "Registration error. Please try again." };
  }
}

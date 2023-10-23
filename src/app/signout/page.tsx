// Import the necessary modules
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // Import the useRouter from next/navigation

export default function Signout() {
  const { data: session } = useSession();
  const router = useRouter(); // Initialize the router

  const handleSignout = async () => {
    const response = await fetch("/api/signout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      // Signout was successful
      router.push("/app"); // Redirect to the desired page, e.g., /app
    } else {
      // Handle signout error
      console.error("Signout failed");
    }
  };

  return (
    <div>
      {session ? (
        <>
          <p>Hello, {session.user?.name}!</p> {/* Add the safe navigation operator */}
          <button onClick={handleSignout}>Sign Out</button>
        </>
      ) : (
        <p>You are not signed in.</p>
      )}
    </div>
  );
}

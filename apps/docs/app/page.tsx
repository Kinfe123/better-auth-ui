import Link from "next/link";

const title = "Better Auth UI";
const description = "Better Auth UI is a beautiful and compatible user interface designed to enhance the authentication experience in your applications using Better Auth as your authentication library , providing you a set of pre built UI components that you can easily copy and paste to kickstart your project.";

export default function HomePage() {
  return (
    <main style={{ padding: 32 }}>
      <h1>{title}</h1>
      <p>{description}</p>
      <Link href="/docs">Open docs</Link>
    </main>
  );
}

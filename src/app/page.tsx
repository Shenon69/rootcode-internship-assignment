import NavBar from "@/components/layout/NavBar";
import Posts from "@/components/Posts";

export default function Home() {
  return (
    <div className="min-h-screen">
      <NavBar />
      <Posts />
    </div>
  );
}

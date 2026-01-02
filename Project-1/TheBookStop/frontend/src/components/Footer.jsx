export default function Footer() {
  return (
   <footer
  className="text-white text-center py-4"
  style={{
    background: "linear-gradient(135deg, #270416ff, #3b0a2eff)",
  }}
>
  <p className="mb-1 fw-semibold">
    © {new Date().getFullYear()} Online TheBookStop
  </p>
  <p className="mb-1">
    Discover, read, and share amazing stories from writers around the world.
  </p>
  <small className="opacity-75">
    Built with passion for storytelling ✨
  </small>
</footer>


  );
}

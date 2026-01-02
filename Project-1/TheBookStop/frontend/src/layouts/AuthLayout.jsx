export default function AuthLayout({ children }) {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      {children}
    </div>
  );
}

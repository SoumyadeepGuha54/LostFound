export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-200 px-6 py-4">
      <div className="text-sm text-gray-600 text-center">
        © {new Date().getFullYear()} Lost / Found. All rights reserved.
      </div>
    </footer>
  );
}

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h2 className="text-lg font-bold mb-3">
            Shop<span className="text-green-500">.</span>
          </h2>
          <p className="text-sm text-gray-500">
            The best place to find your favorite products.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Company</h3>
          <ul className="space-y-2 text-sm text-gray-500">
            <li>About</li>
            <li>Careers</li>
            <li>Blog</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Help</h3>
          <ul className="space-y-2 text-sm text-gray-500">
            <li>Support</li>
            <li>Terms</li>
            <li>Privacy</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Contact</h3>
          <p className="text-sm text-gray-500">support@shop.com</p>
        </div>
      </div>

      <div className="text-center text-sm text-gray-400 pb-6">
        © {new Date().getFullYear()} Shop. All rights reserved.
      </div>
    </footer>
  );
}

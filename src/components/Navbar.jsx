import { ShoppingCart, Search, User } from "lucide-react";

export default function Navbar({ onOpenSearch }) {
  return (
    <nav className="w-full bg-white border-b">
      <div
        className=" max-w-7xl mx-auto 
    px-4 md:px-6 
    py-3 md:py-4 
    flex justify-between items-center"
      >
        <h1 className="text-lg md:text-xl font-bold">
          Shop<span className="text-green-500">.</span>
        </h1>

        <div className="flex items-center gap-3 md:gap-4">
          <Search
            onClick={onOpenSearch}
            className="cursor-pointer w-5 h-5 md:w-6 md:h-6"
          />
          <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" />
          <User className="w-5 h-5 md:w-6 md:h-6" />
        </div>
      </div>
    </nav>
  );
}

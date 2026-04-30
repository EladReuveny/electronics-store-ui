import { useForm } from "@tanstack/react-form";
import {
  ArrowDownNarrowWide,
  ArrowUpNarrowWide,
  EyeOff,
  Filter,
  Heart,
  LayoutGrid,
  LogIn,
  LogOut,
  Search,
  ShoppingBag,
  ShoppingCart,
  User,
  UserPlus,
  X,
  type LucideIcon,
} from "lucide-react";
import { useRef } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import z from "zod";
import { useAuthStore } from "../store/auth.store";
import Logo from "./Logo";
import ToggleButton from "./ToggleButton";

const searchFormSchema = z.object({
  q: z.string(),
  sortBy: z.enum(["price-asc", "price-desc", ""]),
  hideOutOfStock: z.boolean(),
});

type HeaderProps = {};

const Header = ({}: HeaderProps) => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.actions.logout);

  const location = useLocation();
  const navigate = useNavigate();

  const searchDialogRef = useRef<HTMLDialogElement | null>(null);

  const searchForm = useForm({
    defaultValues: {
      q: "",
      sortBy: "",
      hideOutOfStock: false,
    },
    validators: {
      onChange: searchFormSchema,
      onBlur: searchFormSchema,
      onSubmit: searchFormSchema,
    },
    onSubmit: ({ value }) => {
      const params = new URLSearchParams();

      if (value.q) {
        params.set("q", value.q);
      }

      if (value.sortBy) {
        params.set("sortBy", value.sortBy);
      }

      if (value.hideOutOfStock) {
        params.set("hideOutOfStock", String(value.hideOutOfStock));
      }

      navigate({
        pathname: "/products",
        search: params.toString(),
      });

      searchDialogRef.current?.close();
    },
  });

  const navBarLinks: {
    to: string;
    icon: LucideIcon;
    title: string;
    sublist?: { to: string; label: string }[];
  }[] = [
    {
      to: "/categories",
      icon: LayoutGrid,
      title: "Categories",
      sublist: [
        {
          to: "smart-phones",
          label: "Smart Phones",
        },
        {
          to: "tablets",
          label: "Tablets",
        },
        {
          to: "laptops",
          label: "Laptops",
        },
        {
          to: "televisions",
          label: "Televisions",
        },
      ],
    },
    { to: "/wish-list", icon: Heart, title: "Wishlist" },
    { to: "/shopping-cart", icon: ShoppingCart, title: "Shopping Cart" },
    { to: "/orders", icon: ShoppingBag, title: "Orders" },
    { to: "/profile", icon: User, title: "Profile" },
  ];

  return (
    <header>
      <nav className="fixed top-0 w-screen z-100 p-4 bg-(--primary-clr) flex items-center justify-between shadow-md">
        <Logo />

        <button
          type="button"
          onClick={() => searchDialogRef.current?.showModal()}
          className="outline-none cursor-pointer relative flex items-center bg-(--text-clr) text-(--bg-clr)/85 py-1.5 pl-8 pr-12 rounded-full hover:brightness-90 active:scale-[97%]"
        >
          <Search className="size-5 absolute left-2 top-1/2 -translate-y-1/2" />
          <span className="text-sm font-medium">Search for products...</span>
          <Filter className="absolute right-2 top-1/2 -translate-y-1/2 bg-(--primary-clr)/10 p-1 rounded-md size-5.5" />
        </button>

        <div className="flex items-center gap-5">
          {navBarLinks.map((link, i) => (
            <div
              key={`nav-item-${i}`}
              className="relative group flex flex-col items-center"
            >
              <NavLink
                to={link.title === "Categories" ? "#" : link.to}
                title={link.title}
                className={`flex flex-col gap-0.5 items-center ${location.pathname.startsWith(link.to) ? "text-(--secondary-clr)" : ""} hover:scale-105 hover:-translate-y-0.5`}
              >
                <link.icon
                  className={`size-6 ${location.pathname.startsWith(link.to) ? "fill-(--secondary-clr)" : ""}`}
                />
                {link.title}
              </NavLink>

              {link.sublist?.length > 0 && (
                <div className="hidden group-hover:flex flex-col gap-2 p-2 rounded-md absolute top-12 left-1/2 -translate-x-1/2 bg-(--bg-clr) shadow-lg z-1">
                  {link.sublist.map((item, j) => (
                    <Link
                      key={`link-sublist-${j}`}
                      to={
                        link.title === "Categories"
                          ? `/categories/${item.to}`
                          : item.to
                      }
                      className="p-2 whitespace-nowrap border-l-2 border-transparent hover:border-l-(--primary-clr) hover:bg-(--primary-clr)/10 hover:text-(--primary-clr)"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <button
              type="button"
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="cursor-pointer flex items-center justify-center gap-2 bg-(--text-clr) text-(--primary-clr) py-2 px-4 rounded-md hover:brightness-90 active:scale-[97%]"
            >
              Logout <LogOut className="size-5" />
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="cursor-pointer flex items-center justify-center gap-2 bg-(--text-clr) text-(--primary-clr) py-2 px-4 rounded-md hover:brightness-90 active:scale-[97%]"
              >
                Login <LogIn className="size-5" />
              </Link>
              <Link
                to="/register"
                className="cursor-pointer flex items-center justify-center gap-2 bg-(--secondary-clr) text-(--primary-clr) py-2 px-4 rounded-md hover:brightness-110 active:scale-[97%]"
              >
                Register <UserPlus className="size-5" />
              </Link>
            </>
          )}
        </div>
      </nav>

      <dialog
        ref={searchDialogRef}
        className="bg-(--bg-clr) text-(--text-clr) fixed top-1/2 left-1/2 -translate-1/2 p-0 rounded-2xl w-[90%] backdrop:backdrop-blur-md shadow-lg border-2 border-(--primary-clr)/30 overflow-hidden"
        onClick={(e) => {
          if (e.target === searchDialogRef.current)
            searchDialogRef.current?.close();
        }}
      >
        <div className="flex items-center justify-between p-6 border-b border-(--primary-clr)/20">
          <h2 className="font-bold text-2xl text-(--secondary-clr) flex items-center gap-2">
            <Search className="size-6" />
            Find Products
          </h2>
          <button
            type="button"
            className="cursor-pointer bg-(--primary-clr)/10 hover:bg-(--primary-clr)/30 text-(--primary-clr) p-2 rounded-full"
            onClick={() => searchDialogRef.current?.close()}
          >
            <X className="size-6" />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            searchForm.handleSubmit();
          }}
          className="p-6 space-y-8"
        >
          <searchForm.Field name="q">
            {(field) => (
              <div className="relative group">
                <Search className="size-6 absolute left-4 top-1/2 -translate-y-1/2 text-(--primary-clr)/50 group-focus-within:text-(--secondary-clr)" />
                <input
                  id={field.name}
                  name={field.name}
                  type="search"
                  placeholder="Search by name..."
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  className="w-full pl-12 pr-4 py-4 bg-(--primary-clr)/5 border-2 border-(--primary-clr)/20 rounded-xl outline-none focus:border-(--secondary-clr) text-lg"
                  autoFocus
                />
              </div>
            )}
          </searchForm.Field>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <searchForm.Field name="sortBy">
              {(field) => (
                <div className="space-y-3">
                  <label
                    htmlFor={field.name}
                    className="text-sm font-bold uppercase tracking-wider text-(--primary-clr) ml-1 flex items-center gap-2"
                  >
                    <Filter className="size-4" />
                    Sort By Price
                  </label>
                  <select
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) =>
                      field.handleChange(
                        e.target.value as "price-asc" | "price-desc" | "",
                      )
                    }
                    onBlur={field.handleBlur}
                    className="w-full py-3 px-4 bg-(--primary-clr)/5 border-2 border-(--primary-clr)/30 rounded-xl outline-none focus:border-(--secondary-clr) appearance-none cursor-pointer hover:bg-(--primary-clr)/10"
                  >
                    {[
                      {
                        label: "Price: Low to High",
                        value: "price-asc",
                      },
                      {
                        label: "Price: High to Low",
                        value: "price-desc",
                      },
                    ].map((option, i) => (
                      <option
                        key={`sort-option-${i}`}
                        value={option.value}
                        className="bg-(--bg-clr) text-(--text-clr)"
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </searchForm.Field>

            <searchForm.Field name="hideOutOfStock">
              {(field) => (
                <div className="space-y-3">
                  <label className="text-sm font-bold uppercase tracking-wider text-(--primary-clr) ml-1 flex items-center gap-2">
                    <EyeOff className="size-4" />
                    Availability
                  </label>
                  <div className="w-full flex items-center justify-between p-3 bg-(--primary-clr)/5 border-2 border-(--primary-clr)/30 rounded-xl hover:bg-(--primary-clr)/10">
                    <span className="font-medium">Hide Out of Stock</span>
                    <ToggleButton
                      id={field.name}
                      checked={field.state.value}
                      onChange={() => field.handleChange(!field.state.value)}
                      icons={{
                        active: ArrowUpNarrowWide,
                        inactive: ArrowDownNarrowWide,
                      }}
                    />
                  </div>
                </div>
              )}
            </searchForm.Field>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => searchForm.reset()}
              className="cursor-pointer py-3 px-6 rounded-lg font-bold border border-(--primary-clr)/30 hover:bg-(--text-clr)/10 active:scale-[97%]"
            >
              Reset Filters
            </button>
            <button
              type="submit"
              className="cursor-pointer flex items-center justify-center gap-2 text-xl py-3 bg-(--primary-clr) flex-1 rounded-lg hover:brightness-110 active:scale-[97%] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Search className="size-6" />
              Apply Search
            </button>
          </div>
        </form>
      </dialog>
    </header>
  );
};

export default Header;

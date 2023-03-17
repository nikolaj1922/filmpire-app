import Image from "next/image";
import Logo from "../public/FilmpireLogo.png";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "./styledComponents/HeaderComponents";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/router";
import { useMediaQuery, Drawer } from "@mui/material";
import { SlMenu } from "react-icons/sl";
import SideBar from "./SideBar";
import useAuth from "../hooks/useAuth";
import BasicMenu from "./BasicMenu";
import { FiLogOut } from "react-icons/fi";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const matchesMobile = useMediaQuery("(min-width:850px)");
  const matches = useMediaQuery("(min-width:1024px )");
  const { logout, user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) setIsScrolled(true);
      else setIsScrolled(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmitSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search/${query}/1`);
    setQuery("");
  };

  const handleCloseDrawer = () => setMobileOpen((prevState) => !prevState);

  if (!user) return null;

  return (
    <header className={`${isScrolled && "bg-filmpire-black"}`}>
      <div className="flex items-center justify-between space-x-4 lg:space-x-6 w-full">
        <div className="flex space-x-4 lg:space-x-6">
          <div>
            {matchesMobile ? (
              <Link href="/">
                <Image
                  src={Logo}
                  alt="Filmpire logo"
                  width={matches ? 120 : 90}
                  height={100}
                />
              </Link>
            ) : (
              <SlMenu
                className="h-5 w-5 sm:h-6 sm:w-6 cursor-pointer"
                onClick={handleCloseDrawer}
              />
            )}
          </div>
          {matchesMobile && (
            <nav className="flex space-x-4  items-center lg:space-x-6">
              <BasicMenu />
              <Link className="header-link" href="/tvshows">
                TV Shows
              </Link>
              <Link className="header-link" href="/popular">
                New & Popular
              </Link>
              <Link className="header-link" href="/userlist">
                My List
              </Link>
            </nav>
          )}
        </div>

        <form onSubmit={handleSubmitSearch}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              value={query}
              placeholder="Search..."
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
            />
          </Search>
        </form>
        <div>
          <button
            onClick={logout}
            className="header-link flex items-center gap-1"
          >
            <FiLogOut /> Logout
          </button>
        </div>
      </div>
      {!matchesMobile && (
        <Drawer
          anchor="left"
          open={mobileOpen}
          onClose={handleCloseDrawer}
          PaperProps={{
            sx: {
              backgroundColor: "#141414",
              color: "#e5e5e5",
            },
          }}
        >
          <nav>
            <SideBar handleCloseDrawer={handleCloseDrawer} />
          </nav>
        </Drawer>
      )}
    </header>
  );
};

export default Header;

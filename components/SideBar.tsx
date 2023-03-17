import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Link from "next/link";
import Image from "next/image";
import Logo from "../public/FilmpireLogo.png";

const links = [
  { title: "Movies", href: "/" },
  { title: "TV Shows", href: "/tvshows" },
  { title: "New & Popular", href: "/movies/trending/1" },
  { title: "My List", href: "/userlist" },
];

interface Props {
  handleCloseDrawer: () => void;
}

const SideBar = ({ handleCloseDrawer }: Props) => {
  return (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={handleCloseDrawer}
      onKeyDown={handleCloseDrawer}
      className="flex flex-col items-center justify-between h-screen p-8"
    >
      <div>
        <div className="relative my-">
          <Link href="/">
            <Image src={Logo} alt="Filmpire logo" width={140} height={100} />
          </Link>
        </div>
        <List>
          {links.map((link) => (
            <Link key={link.title} href={link.href}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText
                    disableTypography
                    primary={
                      <p className="text-filmpire-link text-xl">{link.title}</p>
                    }
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </div>
    </Box>
  );
};

export default SideBar;

import Header from "./header";
import Footer from "./footer";

export default function Mainpage({
  children,
  navMenu,
  homepath,
  action,
}: {
  children: React.ReactNode;
  navMenu: Array<{ name: string; route: string }>;
  homepath: string;
  action: { name: string; route: string };
}) {
  return (
    <div>
      <Header navMenu={navMenu} homepath={homepath} action={action} />
      <div>{children}</div>
      <Footer />
    </div>
  );
}

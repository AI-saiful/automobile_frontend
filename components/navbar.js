
import MobileSidebar from "@/components/mobile-sidebar";
import Heading from "@/components/header"

const Navbar = async () => {

  return ( 
    <div className="flex items-center p-4">
      <MobileSidebar />
      <Heading />


    </div>
   );
}
 
export default Navbar;

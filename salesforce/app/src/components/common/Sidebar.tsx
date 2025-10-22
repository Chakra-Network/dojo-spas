import { PATH_PREFIX } from "@/lib/consts";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const navItems = [
    { icon: `${PATH_PREFIX}/images/home.png`, label: "Home", active: true },
    {
      icon: `${PATH_PREFIX}/images/contacts.png`,
      label: "Contacts",
      active: false,
    },
    {
      icon: `${PATH_PREFIX}/images/accounts.png`,
      label: "Accounts",
      active: false,
    },
    { icon: `${PATH_PREFIX}/images/sales.png`, label: "Sales", active: false },
    {
      icon: `${PATH_PREFIX}/images/service.png`,
      label: "Service",
      active: false,
    },
    {
      icon: `${PATH_PREFIX}/images/marketing.png`,
      label: "Marketing",
      active: false,
    },
    {
      icon: `${PATH_PREFIX}/images/commerce.png`,
      label: "Commerce",
      active: false,
    },
    {
      icon: `${PATH_PREFIX}/images/generative-canvas.png`,
      label: "Generative Canvas",
      active: false,
    },
    {
      icon: `${PATH_PREFIX}/images/your-account.png`,
      label: "Your Account",
      active: false,
    },
  ];

  return (
    <div className="fixed left-0 top-0 bottom-0 w-[76px] bg-[#032D60] pt-2 z-50 px-2">
      <div className="flex flex-col">
        {navItems.map((item, index) => (
          <div
            key={index}
            className={cn(
              "w-full mt-3 flex flex-col items-center rounded cursor-pointer transition-colors  group"
            )}
            title={item.label}
          >
            <div
              className={cn(
                "h-11 w-11 flex items-center justify-center p-[2px] rounded-lg transition-all duration-200",
                item.active
                  ? "shadow-[inset_0_0_0_2px_white] group-hover:shadow-[inset_0_0_0_4px_white]"
                  : "shadow-[inset_0_0_0_0px_white] group-hover:shadow-[inset_0_0_0_2px_white]"
              )}
            >
              <img
                src={item.icon}
                alt={item.label}
                className="w-9 h-9"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </div>
            <span className="text-[10px] leading-[15px] text-white text-center px-1 mt-[6px] font-semibold">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

import { cn } from "@/lib/utils";
import {
  HOME_IMAGE,
  CONTACTS_IMAGE,
  ACCOUNTS_IMAGE,
  SALES_IMAGE,
  SERVICE_IMAGE,
  MARKETING_IMAGE,
  COMMERCE_IMAGE,
  GENERATIVE_CANVAS_IMAGE,
  YOUR_ACCOUNT_IMAGE,
} from "@/components/resources/images";

export default function Sidebar() {
  const navItems = [
    { icon: HOME_IMAGE, label: "Home", active: true },
    {
      icon: CONTACTS_IMAGE,
      label: "Contacts",
      active: false,
    },
    {
      icon: ACCOUNTS_IMAGE,
      label: "Accounts",
      active: false,
    },
    { icon: SALES_IMAGE, label: "Sales", active: false },
    {
      icon: SERVICE_IMAGE,
      label: "Service",
      active: false,
    },
    {
      icon: MARKETING_IMAGE,
      label: "Marketing",
      active: false,
    },
    {
      icon: COMMERCE_IMAGE,
      label: "Commerce",
      active: false,
    },
    {
      icon: GENERATIVE_CANVAS_IMAGE,
      label: "Generative Canvas",
      active: false,
    },
    {
      icon: YOUR_ACCOUNT_IMAGE,
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

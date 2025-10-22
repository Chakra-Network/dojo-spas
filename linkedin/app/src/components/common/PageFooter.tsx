import { ChevronDown, HelpCircle, Settings, Shield } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface FooterLinkProps {
  href: string;
  children: ReactNode;
  hasDropdown?: boolean;
}

function FooterLink({ href, children, hasDropdown = false }: FooterLinkProps) {
  return (
    <li>
      <a
        href={href}
        className="text-[12px] font-semibold text-gray-600 hover:text-blue-600 hover:underline inline-flex items-center gap-1"
      >
        {children}
        {hasDropdown && <ChevronDown size={12} className="text-gray-600" />}
      </a>
    </li>
  );
}

interface FooterActionItemProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
}

function FooterActionItem({
  icon: Icon,
  title,
  description,
  href,
}: FooterActionItemProps) {
  return (
    <div className="flex items-start gap-2">
      <Icon size={24} className="text-gray-600 flex-shrink-0" />
      <div>
        <a
          href={href}
          className="text-[14px] font-semibold text-gray-900 hover:text-blue-600 hover:underline"
        >
          {title}
        </a>
        <p className="text-[12px] text-gray-500">{description}</p>
      </div>
    </div>
  );
}

export default function PageFooter() {
  return (
    <footer className="mt-8 py-6">
      <div className="max-w-[1128px] mx-auto px-4">
        <div className="grid grid-cols-2">
          {/* Left side - Navigation Links in 3-column grid */}
          <nav>
            <ul className="grid grid-cols-3 gap-x-4 gap-y-1">
              <FooterLink href="#">About</FooterLink>
              <FooterLink href="#">Accessibility</FooterLink>
              <FooterLink href="#">Talent Solutions</FooterLink>
              <FooterLink href="#">Professional Community Policies</FooterLink>
              <FooterLink href="#">Careers</FooterLink>
              <FooterLink href="#">Marketing Solutions</FooterLink>
              <FooterLink href="#" hasDropdown>
                Privacy & Terms
              </FooterLink>
              <FooterLink href="#">Ad Choices</FooterLink>
              <FooterLink href="#">Advertising</FooterLink>
              <FooterLink href="#">Sales Solutions</FooterLink>
              <FooterLink href="#">Mobile</FooterLink>
              <FooterLink href="#">Small Business</FooterLink>
              <FooterLink href="#">Safety Center</FooterLink>
            </ul>
          </nav>

          {/* Right side - Action Items and Language Selector */}
          <div className="grid grid-cols-2">
            <div className="flex flex-col gap-4 min-w-[280px]">
              <FooterActionItem
                icon={HelpCircle}
                title="Questions?"
                description="Visit our Help Center."
                href="#"
              />
              <FooterActionItem
                icon={Settings}
                title="Manage your account and privacy"
                description="Go to your Settings."
                href="#"
              />
              <FooterActionItem
                icon={Shield}
                title="Recommendation transparency"
                description="Learn more about Recommended Content."
                href="#"
              />
            </div>

            {/* Language Selector */}
            <div>
              <label
                htmlFor="language-select"
                className="block text-[12px] text-gray-600 mb-1"
              >
                Select Language
              </label>
              <select
                id="language-select"
                className="text-[12px] font-semibold text-gray-900 border cursor-pointer focus:outline-none bg-white border-gray-200 rounded p-2 w-full"
                defaultValue="en_US"
              >
                <option value="ar_AE">العربية (Arabic)</option>
                <option value="bn_IN">বাংলা (Bangla)</option>
                <option value="cs_CZ">Čeština (Czech)</option>
                <option value="da_DK">Dansk (Danish)</option>
                <option value="de_DE">Deutsch (German)</option>
                <option value="el_GR">Ελληνικά (Greek)</option>
                <option value="en_US">English (English)</option>
                <option value="es_ES">Español (Spanish)</option>
                <option value="fa_IR">فارسی (Persian)</option>
                <option value="fi_FI">Suomi (Finnish)</option>
                <option value="fr_FR">Français (French)</option>
                <option value="hi_IN">हिंदी (Hindi)</option>
                <option value="hu_HU">Magyar (Hungarian)</option>
                <option value="in_ID">Bahasa Indonesia (Indonesian)</option>
                <option value="it_IT">Italiano (Italian)</option>
                <option value="iw_IL">עברית (Hebrew)</option>
                <option value="ja_JP">日本語 (Japanese)</option>
                <option value="ko_KR">한국어 (Korean)</option>
                <option value="mr_IN">मराठी (Marathi)</option>
                <option value="ms_MY">Bahasa Malaysia (Malay)</option>
                <option value="nl_NL">Nederlands (Dutch)</option>
                <option value="no_NO">Norsk (Norwegian)</option>
                <option value="pa_IN">ਪੰਜਾਬੀ (Punjabi)</option>
                <option value="pl_PL">Polski (Polish)</option>
                <option value="pt_BR">Português (Portuguese)</option>
                <option value="ro_RO">Română (Romanian)</option>
                <option value="ru_RU">Русский (Russian)</option>
                <option value="sv_SE">Svenska (Swedish)</option>
                <option value="te_IN">తెలుగు (Telugu)</option>
                <option value="th_TH">ภาษาไทย (Thai)</option>
                <option value="tl_PH">Tagalog (Tagalog)</option>
                <option value="tr_TR">Türkçe (Turkish)</option>
                <option value="uk_UA">Українська (Ukrainian)</option>
                <option value="vi_VN">Tiếng Việt (Vietnamese)</option>
                <option value="zh_CN">简体中文 (Chinese (Simplified))</option>
                <option value="zh_TW">正體中文 (Chinese (Traditional))</option>
              </select>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <p className="mt-4 text-[12px] text-gray-500">
          LinkedIn Corporation © 2025
        </p>
      </div>
    </footer>
  );
}

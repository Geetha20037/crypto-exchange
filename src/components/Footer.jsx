import {
  FaTwitter,
  FaInstagram,
  FaGithub,
  FaDiscord,
  FaArrowUp,
  FaHeadset,
  FaShieldAlt,
  FaFileContract,
  FaQuestionCircle,
} from "react-icons/fa";

function Footer() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="mt-12 border-t theme-border theme-card">
      <div className="mx-auto w-full max-w-[1600px] px-4 py-10 sm:px-6 lg:px-8">

        {/* FOOTER TOP */}

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {/* BRAND */}

          <div>
            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-2.5"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 text-lg font-bold text-white">
                ₿
              </div>

              <div className="text-left">
                <h2 className="text-lg font-bold theme-text">
                  CryptoX
                </h2>

                <p className="text-[10px] uppercase tracking-widest theme-muted">
                  Exchange
                </p>
              </div>
            </button>

            <p className="mt-4 max-w-xs text-xs leading-5 theme-muted">
              A modern cryptocurrency trading dashboard
              built for fast and simple digital asset
              management.
            </p>

            {/* SOCIAL ICONS */}

            <div className="mt-5 flex items-center gap-2">

              <SocialButton
                icon={FaTwitter}
                label="Twitter"
              />

              <SocialButton
                icon={FaInstagram}
                label="Instagram"
              />

              <SocialButton
                icon={FaGithub}
                label="GitHub"
              />

              <SocialButton
                icon={FaDiscord}
                label="Discord"
              />

            </div>
          </div>

          {/* PLATFORM */}

          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider theme-text">
              Platform
            </h3>

            <div className="space-y-2.5">

              <FooterLink
                label="Markets"
                onClick={() =>
                  scrollToSection("markets")
                }
              />

              <FooterLink
                label="Trading"
                onClick={() =>
                  scrollToSection("trade")
                }
              />

              <FooterLink
                label="Portfolio"
                onClick={() =>
                  scrollToSection("portfolio")
                }
              />

              <FooterLink
                label="Transactions"
                onClick={() =>
                  scrollToSection("transactions")
                }
              />

            </div>
          </div>

          {/* ACCOUNT */}

          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider theme-text">
              Account
            </h3>

            <div className="space-y-2.5">

              <FooterLink
                label="Dashboard"
                onClick={() =>
                  scrollToSection("dashboard")
                }
              />

              <FooterLink
                label="Profile"
                onClick={() =>
                  scrollToSection("profile")
                }
              />

              <FooterLink
                label="Watchlist"
                onClick={() =>
                  scrollToSection("watchlist")
                }
              />

              <FooterLink
                label="Settings"
                onClick={() =>
                  scrollToSection("settings")
                }
              />

            </div>
          </div>

          {/* SUPPORT */}

          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider theme-text">
              Support
            </h3>

            <div className="space-y-2.5">

              <FooterLink
                label="Help Center"
                icon={FaQuestionCircle}
                onClick={() =>
                  scrollToSection("help-center")
                }
              />

              <FooterLink
                label="Contact Support"
                icon={FaHeadset}
                onClick={() =>
                  scrollToSection("contact-support")
                }
              />

              <FooterLink
                label="Privacy Policy"
                icon={FaShieldAlt}
                onClick={() =>
                  scrollToSection("privacy-policy")
                }
              />

              <FooterLink
                label="Terms of Service"
                icon={FaFileContract}
                onClick={() =>
                  scrollToSection("terms")
                }
              />

            </div>
          </div>
        </div>

        {/* SUPPORT SECTIONS */}

        <div className="mt-10 grid gap-5 lg:grid-cols-2">

          {/* HELP CENTER */}

          <section
            id="help-center"
            className="theme-secondary scroll-mt-24 rounded-2xl border theme-border p-5"
          >
            <div className="flex items-start gap-4">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500">
                <FaQuestionCircle />
              </div>

              <div>
                <h3 className="text-sm font-bold theme-text">
                  Help Center
                </h3>

                <p className="mt-2 text-xs leading-5 theme-muted">
                  Find answers to common questions about
                  trading, portfolio management, orders,
                  deposits and account settings.
                </p>

                <button
                  type="button"
                  onClick={() =>
                    scrollToSection("trade")
                  }
                  className="mt-3 rounded-lg bg-violet-500/10 px-3 py-2 text-xs font-semibold text-violet-500 transition hover:bg-violet-500 hover:text-white"
                >
                  Go to Trading
                </button>
              </div>
            </div>
          </section>

          {/* CONTACT SUPPORT */}

          <section
            id="contact-support"
            className="theme-secondary scroll-mt-24 rounded-2xl border theme-border p-5"
          >
            <div className="flex items-start gap-4">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500">
                <FaHeadset />
              </div>

              <div className="min-w-0">
                <h3 className="text-sm font-bold theme-text">
                  Contact Support
                </h3>

                <p className="mt-2 text-xs leading-5 theme-muted">
                  Our support team is available to help
                  with your CryptoX account and trading
                  experience.
                </p>

                {/* EMAIL SUPPORT */}

                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=support@cryptox.com&su=CryptoX%20Support%20Request&body=Hello%20CryptoX%20Support%2C%0A%0AI%20need%20help%20with%3A"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center rounded-lg bg-violet-500 px-4 py-2 text-xs font-semibold text-white transition hover:-translate-y-0.5 hover:bg-violet-400"
                >
                  Email Support
                </a>

                <p className="mt-2 text-[10px] theme-muted">
                  support@cryptox.com
                </p>
              </div>
            </div>
          </section>

          {/* PRIVACY POLICY */}

          <section
            id="privacy-policy"
            className="theme-secondary scroll-mt-24 rounded-2xl border theme-border p-5"
          >
            <div className="flex items-start gap-4">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500">
                <FaShieldAlt />
              </div>

              <div>
                <h3 className="text-sm font-bold theme-text">
                  Privacy Policy
                </h3>

                <p className="mt-2 text-xs leading-5 theme-muted">
                  CryptoX is a frontend training project
                  using mock cryptocurrency data. No real
                  financial or personal transactions are
                  processed.
                </p>

                <p className="mt-2 text-[10px] text-violet-500">
                  Your data remains private in this
                  simulated application.
                </p>
              </div>
            </div>
          </section>

          {/* TERMS */}

          <section
            id="terms"
            className="theme-secondary scroll-mt-24 rounded-2xl border theme-border p-5"
          >
            <div className="flex items-start gap-4">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500">
                <FaFileContract />
              </div>

              <div>
                <h3 className="text-sm font-bold theme-text">
                  Terms of Service
                </h3>

                <p className="mt-2 text-xs leading-5 theme-muted">
                  CryptoX is a simulated cryptocurrency
                  exchange interface created for frontend
                  development and training purposes only.
                </p>

                <p className="mt-2 text-[10px] text-violet-500">
                  No real cryptocurrency transactions are
                  performed.
                </p>
              </div>
            </div>
          </section>

        </div>

        {/* DIVIDER */}

        <div className="my-8 border-t theme-border" />

        {/* BOTTOM */}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <p className="text-xs theme-muted">
            © {new Date().getFullYear()} CryptoX.
            All rights reserved.
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="group flex items-center gap-2 self-start rounded-lg px-3 py-2 text-xs font-medium theme-muted transition hover:bg-violet-500/10 hover:text-violet-500 sm:self-auto"
          >
            Back to top

            <FaArrowUp className="text-[10px] transition group-hover:-translate-y-0.5" />
          </button>

        </div>
      </div>
    </footer>
  );
}

/* FOOTER LINK */

function FooterLink({
  label,
  onClick,
  icon: Icon,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex items-center gap-2 text-left text-xs theme-muted transition hover:translate-x-1 hover:text-violet-500"
    >
      {Icon && (
        <Icon className="text-[10px] opacity-70" />
      )}

      <span>{label}</span>
    </button>
  );
}

/* SOCIAL BUTTON */

function SocialButton({
  icon: Icon,
  label,
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={() =>
        alert(`${label} link clicked.`)
      }
      className="flex h-9 w-9 items-center justify-center rounded-lg theme-secondary theme-muted transition hover:bg-violet-500 hover:text-white"
    >
      <Icon className="text-sm" />
    </button>
  );
}

export default Footer;
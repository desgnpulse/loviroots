import Link from "next/link";

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
  "Hi Lovi! I have a question about your products."
)}`;

export function Footer() {
  return (
    <footer className="lv-footer">
      <div className="lv-footer-shell">
        <div className="lv-footer-top">
          <div>
            <p className="lv-footer-mark">Loviroots</p>
            <p className="lv-footer-tag">
              Natural skincare rooted in African heritage. Registered as Loviroots &mdash; your
              friends call us Lovi.
            </p>
          </div>
          <div>
            <h4>Shop</h4>
            <ul>
              <li>
                <Link href="/products">All products</Link>
              </li>
              <li>
                <Link href="/how-to-use">How to use</Link>
              </li>
              <li>
                <Link href="/cart">Cart</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4>Brand</h4>
            <ul>
              <li>
                <Link href="/about">About Loviroots</Link>
              </li>
              <li>
                <Link href="/blog">Journal</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4>Talk to us</h4>
            <ul>
              <li>
                <a href={WA_URL} target="_blank" rel="noopener noreferrer">
                  WhatsApp &mdash; fastest reply
                </a>
              </li>
              <li>
                <a href="mailto:hello@loviroots.com">hello@loviroots.com</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="lv-footer-bottom">
          <p className="lv-legal">&copy; {new Date().getFullYear()} Loviroots &middot; Nairobi, Kenya</p>
          <p className="lv-legal">Solid at 24&deg; &middot; Silk at 37&deg;</p>
        </div>
      </div>
    </footer>
  );
}

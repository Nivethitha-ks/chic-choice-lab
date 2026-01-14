import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Youtube, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <h2 className="text-2xl font-display font-bold tracking-tight">ELEVATE</h2>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Premium men's fashion for the modern gentleman. Quality craftsmanship meets contemporary style.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-accent transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Shop</h3>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li><Link to="/collections/casual-wear" className="hover:text-primary-foreground transition-colors">Casual Wear</Link></li>
              <li><Link to="/collections/formal-wear" className="hover:text-primary-foreground transition-colors">Formal Wear</Link></li>
              <li><Link to="/collections/traditional-wear" className="hover:text-primary-foreground transition-colors">Traditional Wear</Link></li>
              <li><Link to="/collections/accessories" className="hover:text-primary-foreground transition-colors">Accessories</Link></li>
              <li><Link to="/collections/footwear" className="hover:text-primary-foreground transition-colors">Footwear</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Help</h3>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li><Link to="/track-order" className="hover:text-primary-foreground transition-colors">Track Order</Link></li>
              <li><Link to="/returns" className="hover:text-primary-foreground transition-colors">Returns & Exchange</Link></li>
              <li><Link to="/shipping" className="hover:text-primary-foreground transition-colors">Shipping Info</Link></li>
              <li><Link to="/size-guide" className="hover:text-primary-foreground transition-colors">Size Guide</Link></li>
              <li><Link to="/contact" className="hover:text-primary-foreground transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Newsletter</h3>
            <p className="text-sm text-primary-foreground/70">
              Subscribe for exclusive offers, new arrivals, and style tips.
            </p>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full pl-10 pr-4 py-3 bg-primary-foreground/10 border border-primary-foreground/20 rounded-sm text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:border-accent text-sm"
                />
              </div>
            </div>
            <button className="w-full btn-outline border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              Subscribe
            </button>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/50">
          <p>© 2024 ELEVATE. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-primary-foreground transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

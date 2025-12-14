"use client";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-[var(--accent)] mb-6">Privacy Policy</h1>
        <p className="text-[var(--muted)] mb-10">Last updated: November 2025</p>

        <p className="mb-6 leading-relaxed">
          At <strong>BlueBuff</strong>, your privacy is important to us. This Privacy Policy explains how we collect, store, and protect your information when you access our website, explore wallpapers, read blogs, or interact with MLBB-related content.
        </p>

        <h2 className="text-2xl font-semibold text-[var(--accent)] mb-3">1. Information We Collect</h2>
        <p className="mb-6 leading-relaxed">
          We may collect:
          <br /><br />
          <strong>• Information you provide</strong> — such as when you contact us or submit feedback.  
          <br />
          <strong>• Analytics & technical data</strong> — including browser type, device information, IP address, and usage statistics to improve website performance.
        </p>

        <h2 className="text-2xl font-semibold text-[var(--accent)] mb-3">2. How We Use Your Information</h2>
        <p className="mb-6 leading-relaxed">
          Your information helps us:
          <br /><br />
          • Improve BlueBuff’s performance and user experience  
          <br />
          • Customize content such as wallpapers, hero guides, and esports updates  
          <br />
          • Ensure smooth and secure website functionality  
          <br /><br />
          We do <strong>not</strong> sell or share your personal data for commercial purposes.
        </p>

        <h2 className="text-2xl font-semibold text-[var(--accent)] mb-3">3. Cookies</h2>
        <p className="mb-6 leading-relaxed">
          We use cookies to enhance your browsing experience — such as remembering preferences, improving loading speed, and analyzing traffic.  
          <br />
          You may disable cookies in your browser settings, but certain site features may not function properly.
        </p>

        <h2 className="text-2xl font-semibold text-[var(--accent)] mb-3">4. Third-Party Services</h2>
        <p className="mb-6 leading-relaxed">
          BlueBuff may use third-party services such as analytics tools, content delivery networks, or social media integrations.  
          These platforms may collect their own usage data through their embedded features.
          <br />
          We recommend reviewing their individual privacy policies for more details.
        </p>

        <h2 className="text-2xl font-semibold text-[var(--accent)] mb-3">5. Your Rights</h2>
        <p className="mb-6 leading-relaxed">
          You may request:  
          <br /><br />
          • Access to the data we have about you  
          <br />
          • Correction of inaccurate information  
          <br />
          • Deletion of your data  
          <br /><br />
          To exercise these rights, please contact us through our{" "}
          <a href="/contact" className="text-[var(--accent)] hover:underline">
            Contact Page
          </a>.
        </p>

        <h2 className="text-2xl font-semibold text-[var(--accent)] mb-3">6. Changes to This Policy</h2>
        <p className="mb-6 leading-relaxed">
          We may update this Privacy Policy as our platform evolves.  
          Any changes will be posted here with a revised “Last updated” date.
        </p>

        <p className="leading-relaxed">
          For any questions or concerns, reach out to us via{" "}
          <a href="/contact" className="text-[var(--accent)] hover:underline">
            BlueBuff Contact
          </a>.
        </p>
      </div>
    </main>
  );
}

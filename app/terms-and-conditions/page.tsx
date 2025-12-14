"use client";

export default function TermsAndConditions() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] px-6 py-10">
      <div className="max-w-4xl mx-auto">
        
        <h1 className="text-4xl font-bold text-[var(--accent)] mb-6">
          Terms & Conditions
        </h1>
        <p className="text-[var(--muted)] mb-10">Last updated: November 2025</p>

        <p className="mb-6 leading-relaxed">
          Welcome to <strong>BlueBuff</strong>! By accessing or using our site—
          wallpapers, blogs, hero guides, esports updates, or event information—
          you agree to follow these Terms & Conditions.
        </p>

        {/* 1 */}
        <h2 className="text-2xl font-semibold text-[var(--accent)] mb-3">
          1. Use of the Site
        </h2>
        <p className="mb-6 leading-relaxed">
          You agree to use BlueBuff only for lawful purposes and in a manner that 
          does not harm, disrupt, or negatively affect the experience of other users.
          <br /><br />
          Misuse, spamming, scraping, or unauthorized downloading of bulk content 
          is strictly prohibited.
        </p>

        {/* 2 */}
        <h2 className="text-2xl font-semibold text-[var(--accent)] mb-3">
          2. Intellectual Property
        </h2>
        <p className="mb-6 leading-relaxed">
          All wallpapers, graphics, blog content, and UI elements on BlueBuff are 
          protected by copyright.
          <br /><br />
          You may download wallpapers or images for <strong>personal, non-commercial use only</strong>.
          <br />
          Redistribution, republishing, or selling our content is not allowed without permission.
        </p>

        {/* 3 */}
        <h2 className="text-2xl font-semibold text-[var(--accent)] mb-3">
          3. User Submissions
        </h2>
        <p className="mb-6 leading-relaxed">
          If you submit content to BlueBuff (such as custom wallpapers, ideas, 
          suggestions, or requests), you grant us a non-exclusive, royalty-free, 
          worldwide license to display, modify, and distribute that content on our platform.
        </p>

        {/* 4 */}
        <h2 className="text-2xl font-semibold text-[var(--accent)] mb-3">
          4. Disclaimer
        </h2>
        <p className="mb-6 leading-relaxed">
          BlueBuff is a <strong>fan-made, unofficial platform</strong> dedicated to Mobile Legends: Bang Bang.
          We do not claim ownership of MLBB artwork, characters, logos, or in-game assets.
          <br /><br />
          All trademarks and rights belong to <strong>Moonton / ByteDance</strong> and respective creators.
        </p>

        {/* 5 */}
        <h2 className="text-2xl font-semibold text-[var(--accent)] mb-3">
          5. Limitation of Liability
        </h2>
        <p className="mb-6 leading-relaxed">
          BlueBuff is provided for informational and entertainment purposes only.  
          We are not responsible for:
          <br /><br />
          • Errors in blogs, builds, or game guides  
          • Esports updates that may change over time  
          • Damages caused by using or relying on site content  
          • Website downtime or technical issues  
        </p>

        {/* 6 */}
        <h2 className="text-2xl font-semibold text-[var(--accent)] mb-3">
          6. Changes to Terms
        </h2>
        <p className="leading-relaxed">
          BlueBuff may update these Terms & Conditions from time to time.  
          Changes take effect immediately upon being posted on this page.  
          We encourage you to review the Terms periodically.
        </p>
      </div>
    </main>
  );
}

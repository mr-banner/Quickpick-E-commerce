import React, { useRef } from "react";

function Policy() {
  // Refs for each section
  const sectionRefs = {
    section1: useRef(null),
    section2: useRef(null),
    section3: useRef(null),
    section4: useRef(null),
    section5: useRef(null),
    section6: useRef(null),
    section7: useRef(null),
    section8: useRef(null),
    section9: useRef(null),
  };

  const handleScroll = (sectionId) => {
    // Scroll to the specified section
    sectionRefs[sectionId].current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div >
      <div className="flex flex-col justify-center items-center bg-[#ffe4d5] sm:h-52 h-full mt-3 mb-1">
        <p className="sm:text-2xl text-md font-bold tracking-wider sm:pb-2 pt-1">PRIVACY POLICY</p>
        <p className="sm:text-xl text-sm tracking-wider font-medium text-gray-500 pb-3">
          How QuickPick handles your data
        </p>
        <p className="text-sm font-light tracking-tight text-gray-600 pb-2 sm:pb-0">
          Updated December 26,2024
        </p>
      </div>

      <div>
        <p className="text-center sm:text-base text-xs pl-1 font-normal text-gray-700 pb-2">
          Welcome to QuickPick! Your privacy is important to us, and we are
          committed to safeguarding the information you share with us. This
          policy explains how we collect, use, and protect your information.This
          policy outlines the types of information we collect, how it is
          utilized to enhance your shopping experience, and the measures we take
          to ensure its safety. We believe in transparency and aim to empower
          you with knowledge about your privacy rights and choices.
        </p>
      </div>

      <hr className="border-t border-gray-300 mb-5" />

      <div className="flex sm:gap-x-48 justify-around items-stretch gap-3 relative sm:flex-row flex-col">
        <div className="sm:w-1/4 w-full text-gray-900 sm:sticky sm:top-0 sm:h-[calc(100vh-7rem)]">
          <p
            className="font-semibold mb-2 cursor-pointer hover:text-[#d89977] duration-650 hover:scale-110 transition-all ease-in-out"
            onClick={() => handleScroll("section1")}
          >
            Information We Collect
          </p>
          <p
            className="font-semibold mb-2 cursor-pointer hover:text-[#d89977] duration-650 hover:scale-110 transition-all ease-in-out"
            onClick={() => handleScroll("section2")}
          >
            How We Use Your Information
          </p>
          <p
            className="font-semibold mb-2 cursor-pointer hover:text-[#d89977] duration-650 hover:scale-110 transition-all ease-in-out"
            onClick={() => handleScroll("section3")}
          >
            Sharing Your Information
          </p>
          <p
            className="font-semibold mb-2 cursor-pointer hover:text-[#d89977] duration-650 hover:scale-110 transition-all ease-in-out"
            onClick={() => handleScroll("section4")}
          >
            Cookies and Tracking Technologies
          </p>
          <p
            className="font-semibold mb-2 cursor-pointer hover:text-[#d89977] duration-650 hover:scale-110 transition-all ease-in-out"
            onClick={() => handleScroll("section5")}
          >
            Data Security
          </p>
          <p
            className="font-semibold mb-2 cursor-pointer hover:text-[#d89977] duration-650 hover:scale-110 transition-all ease-in-out"
            onClick={() => handleScroll("section6")}
          >
            Your Rights
          </p>
          <p
            className="font-semibold mb-2 cursor-pointer hover:text-[#d89977] duration-650 hover:scale-110 transition-all ease-in-out"
            onClick={() => handleScroll("section7")}
          >
            Children's Privacy
          </p>
          <p
            className="font-semibold mb-2 cursor-pointer hover:text-[#d89977] duration-650 hover:scale-110 transition-all ease-in-out"
            onClick={() => handleScroll("section8")}
          >
            Updates To This Policy
          </p>
          <p
            className="font-semibold mb-2 cursor-pointer hover:text-[#d89977] duration-650 hover:scale-110 transition-all ease-in-out"
            onClick={() => handleScroll("section9")}
          >
            Contact Us
          </p>
        </div>

        <div className="text-gray-700">
          <div ref={sectionRefs.section1}>
            <h2 className="text-2xl font-medium pb-1">Information We Collect</h2>
            <p className="pb-2">
              We may collect the following information when you use our
              services:
            </p>
            <ul className="pl-5">
              <li className="list-disc">
                <span className="font-semibold">Personal Information:</span>
                <ul className="list-disc ml-5 mt-2 space-y-1">
                  <li className="pb-2">
                    Name, email address, phone number, shipping and billing
                    addresses, payment details.
                  </li>
                </ul>
              </li>
              <li className="list-disc">
                <span className="font-semibold">Account Information:</span>
                <ul className="list-disc ml-5 mt-2 space-y-1">
                  <li className="pb-2">
                    Username, password, and account preferences.
                  </li>
                </ul>
              </li>
              <li className="list-disc">
                <span className="font-semibold">Order Details:</span>
                <ul className="list-disc ml-5 mt-2 space-y-1">
                  <li className="pb-2">
                    Products purchased, transaction details, delivery
                    preferences.
                  </li>
                </ul>
              </li>
              <li className="list-disc">
                <span className="font-semibold">Device and Usage Information:</span>
                <ul className="list-disc ml-5 mt-2 space-y-1">
                  <li className="pb-2">
                    IP address, browser type, device details, and website usage
                    patterns through cookies and similar technologies.
                  </li>
                </ul>
              </li>
              <li className="list-disc">
                <span className="font-semibold">Optional Information:</span>
                <ul className="list-disc ml-5 mt-2 space-y-1">
                  <li className="pb-2">
                    Feedback, reviews, survey responses, or other details you
                    voluntarily provide.
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          <div ref={sectionRefs.section2} className="mt-4">
            <h2 className="text-2xl font-medium pb-1">
              How We Use Your Information
            </h2>
            <p className="pb-2">
              We use the collected information for the following purposes:
            </p>
            <ul className="pl-5">
              <li className="list-disc pb-2">
                To process your orders and deliver products or services.
              </li>
              <li className="list-disc pb-2">
                To communicate with you about your orders, account, or customer
                support inquiries.
              </li>
              <li className="list-disc pb-2">
                To provide personalized recommendations and improve your
                shopping experience.
              </li>
              <li className="list-disc pb-2">
                To send promotional emails, special offers, or updates (if you
                opt-in).
              </li>
              <li className="list-disc pb-2">
                To analyze and improve the functionality and security of our
                website.
              </li>
            </ul>
          </div>

          <div ref={sectionRefs.section3} className="mt-6">
            <h2 className="text-2xl font-medium pb-1">Sharing Your Information</h2>
            <p className="pb-1">
              Your data may be shared only under the following circumstances:
            </p>
            <ul className="pl-5">
              <li className="list-disc pb-2">
                <span className="font-medium">Third-Party Service Providers:</span>{" "}
                For payment processing, shipping, and analytics services.
              </li>
              <li className="list-disc pb-2">
                <span className="font-medium">Legal Compliance:</span> To comply
                with applicable laws or respond to legal requests.
              </li>
              <li className="list-disc pb-2">
                <span className="font-medium">Business Transfers:</span> In case
                of mergers, acquisitions, or sale of assets, your information
                may be transferred as part of the transaction.
              </li>
            </ul>
            <p>
              We do not sell or rent your personal information to third parties.
            </p>
          </div>

          <div ref={sectionRefs.section4} className="mt-6">
            <h2 className="text-2xl font-medium pb-1">
              Cookies and Tracking Technologies
            </h2>
            <p className="pb-1">
              We use cookies to enhance your experience on our website. Cookies
              help us:
            </p>
            <ul className="pl-5">
              <li className="list-disc pb-2">Keep you logged in.</li>
              <li className="list-disc pb-2">Remember your preferences.</li>
              <li className="list-disc pb-1">
                Track website traffic and user behavior.
              </li>
            </ul>
            <p>
              You can manage or disable cookies through your browser settings,
              but doing so may impact certain features of the site.
            </p>
          </div>

          <div ref={sectionRefs.section5} className="mt-6">
            <h2 className="text-2xl font-medium pb-1">Data Security</h2>
            <p className="pb-1">
              We take your security seriously and implement the following
              measures:
            </p>
            <ul className="pl-5">
              <li className="list-disc pb-2">
                Encryption of sensitive data, such as payment details, during
                transmission.
              </li>
              <li className="list-disc pb-2">
                Secure servers and firewalls to protect against unauthorized
                access.
              </li>
              <li className="list-disc pb-1">
                Regular updates to security protocols to ensure data safety.
              </li>
            </ul>
          </div>

          <div ref={sectionRefs.section6} className="mt-6">
            <h2 className="text-2xl font-medium pb-1">Your Rights</h2>
            <p className="pb-1">You have the right to:</p>
            <ul className="pl-5">
              <li className="list-disc pb-2">
                Access, update, or delete your personal information.
              </li>
              <li className="list-disc pb-2">
                Opt-out of marketing emails by clicking the unsubscribe link.
              </li>
              <li className="list-disc pb-1">
                Request a copy of the information we have about you.
              </li>
            </ul>
            <p>To exercise your rights, contact us using the details below.</p>
          </div>

          <div ref={sectionRefs.section7} className="mt-6">
            <h2 className="text-2xl font-medium pb-1">Children’s Privacy</h2>
            <p className="pb-1">
              Our services are not intended for children under the age of 13. We
              do not knowingly collect personal information from minors. If you
              believe we have collected data from a minor, please contact us to
              remove it.{" "}
            </p>
          </div>

          <div ref={sectionRefs.section8} className="mt-6">
            <h2 className="text-2xl font-medium pb-1">
              Updates to This Policy
            </h2>
            <p className="pb-1">
              We may update this Privacy Policy from time to time. Any changes
              will be posted on this page, and significant changes may be
              communicated via email.
            </p>
          </div>

          <div ref={sectionRefs.section9} className="mt-6 mb-6">
            <h2 className="text-2xl font-medium pb-1">Contact Us</h2>
            <p className="pb-1">
              If you have any questions or concerns about this Privacy Policy,
              you can contact us at:
            </p>
            <ul className="pl-5">
              <li className="list-disc pb-2">
                <span className="font-semibold">Email: </span>
                support@QuickPick.com
              </li>
              <li className="list-disc pb-2">
                <span className="font-semibold">Phone: </span> (415)
                555-0132
              </li>
              <li className="list-disc pb-1">
                <span className="font-semibold">Address: </span>
                Munnekollal, Bengaluru, India
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="text-center sm:h-20 bg-[#ffe4d5] p-4 mb-5">
        <p className="sm:text-xl text-lg font-bold text-gray-700">
          Thank you for choosing QuickPick.
        </p>
          <p className="text-md text-gray-700">
          We look forward to serving you with the best possible experience,
          built on trust and respect for your privacy.
          </p>
      </div>
    </div>
  );
}

export default Policy;
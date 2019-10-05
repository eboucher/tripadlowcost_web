// WARNING: THIS FILE IS NOT BEING READ BY THE PROJECT AND I DON'T UNDERSTAND WHY!

/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */
export default [
    {
      path: '',
      // Relative to /src/views
      view: 'Home'
    },
    {
      path: '/about',
      name: 'About Us',
      view: 'AboutUsLALALA'
    },
    {
      path: '/about/CookieConsent',
      name: 'Cookie Consent',
      view: '/about/CookieConsent'
    },
    {
      path: '/about/cookie-policy',
      name: 'Cookie Policy',
      view: 'CookiePolicy'
    },
    {
      path: '/about/privacy-policy',
      name: 'Privacy Policy',
      view: 'PrivacyPolicy'
    },
    {
      path: '/about/terms-and-conditions',
      name: 'Terms and Conditions',
      view: 'TermsAndConditions'
    }
  ]
  
"use client"
import { useEffect } from 'react';
import Session from 'supertokens-web-js/recipe/session';

export default function RefreshPage() {

  useEffect(() => {
    Session.attemptRefreshingSession().then(success => {
      if (success) {
        // we have new session tokens, so we redirect the user back
        // to where they were.
        const urlParams = new URLSearchParams(window.location.search);
        console.log('urlParams: ', urlParams);
        window.location.href = urlParams.get('redirectBack')!;
      } else {
        // we redirect to the login page since the user
        // is now logged out
        window.location.href = "/login"
      }
    })
  }, [])



  return <section className="flex flex-col h-full w-full justify-center items-center gap-4">Refresh Page</section>
}
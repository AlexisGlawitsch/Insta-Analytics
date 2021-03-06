import React, { useEffect } from "react";
import FacebookLogin from "react-facebook-login";

function SDKLoader(props) {
  window.fbAsyncInit = function () {
    window.FB.init({
      appId: "291539642200299",
      cookie: true,
      xfbml: true,
      version: "v7.0",
    });

    window.FB.AppEvents.logPageView();
  };

  // Load Facebook SDK
  (function (d, s, id) {
    var js,
      fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
      return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  })(document, "script", "facebook-jssdk");

  useEffect(() => {
    if (window.FB) {
      props.setLoaded(true);
    }
  });

  return null;
}

export default function FacebookLoginHandler({
  setAccessToken,
  setId,
  setSignedIn,
}) {
  const [sdkLoaded, setSdkLoaded] = React.useState(false);

  // const checkIfLoggedIn = (response) => {
  //   switch (response.status) {
  //     case "connected":
  //       console.log("Response status: connected");
  //       window.FB.api("/me", function (response) {
  //         console.log("Successful login for: " + response.name);
  //       });
  //       setLogin(true);
  //       console.log("Set login to true");
  //       break;
  //     case "not_authorized":
  //       console.log("Response status: Not authorized");
  //       break;
  //     case "unknown":
  //       console.log("Unknown");
  //       break;
  //     default:
  //       console.log(response.status);
  //       console.log("Response status: Unexpected response status");
  //   }
  // };

  console.log(sdkLoaded);

  const statusChangeCallback = (response) => {
    console.log("Response" + JSON.stringify(response));
    setId(response.id);

    if (response.accessToken) {
      setAccessToken(response.accessToken);
      setSignedIn(true);
    }
  };

  return (
    <div>
      <SDKLoader setLoaded={setSdkLoaded} />
      <div>
        <FacebookLogin
          appId="291539642200299"
          autoLoad={true}
          fields="id, name, email, picture"
          scope="public_profile, instagram_basic, pages_show_list"
          callback={statusChangeCallback}
          icon="fa-facebook"
        />
      </div>
    </div>
  );
}

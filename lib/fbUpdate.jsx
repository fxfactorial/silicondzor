export default {
  login: () => {
    FB.login(function(){}, {scope: 'publish_actions'});
  },
  initialize_fb: () => {
    window.fbAsyncInit = function() {
      FB.init({
        appId      : '1680235188935809',
        xfbml      : true,
        version    : 'v2.8'
      });
      FB.AppEvents.logPageView();
    };
    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "//connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
  },
  update_fb_events: () => {
      FB.api(
       `/276798299020346?fields=events`,
       'GET',
       {},
       function(response) {
         console.log(response);
       }
     );
     FB.api(
      `/MICArmenia?fields=events`,
      'GET',
      {},
      function(response) {
        console.log(response);
      }
    );
  }
};

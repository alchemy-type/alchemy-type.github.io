const authApi = {
  checkAuth(onLoadUser) {
    const token = window.sessionStorage.getItem("token");
    if (token) {
      fetch("https://alchemy-type-api.herokuapp.com/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        }
      })
        .then(resp => resp.json())
        .then(data => {
          if (data === "Unauthorized") {
            authApi.redirectLogin();
          }
          onLoadUser(data);
        })
        .catch("Error checking authorization");
    } else {
      authApi.redirectLogin();
      onLoadUser(null);
    }
  },
  redirectLogin() {
    if (
      window.location.pathname !== "/landing.html" &&
      window.location.pathname !== "/login.html" &&
      window.location.pathname !== "/register.html"
    ) {
      window.location = "./landing.html";
    }
  },
  saveAuthToken(token) {
    window.sessionStorage.setItem("token", token);
    window.location = "./index.html";
  },
  logout() {
    sessionStorage.removeItem("token");
  }
};

export default authApi;

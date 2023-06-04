import StoreModule from "../module";

class AuthState extends StoreModule {

  initState() {
    return {
      loginValue: "",
      passwordValue: "",
      isLoggedIn: false,
      profileInfo: {
        name: "",
        phone: "",
        email: ""
      },
      serverError: "",
      waiting: false 
    }
  }

  setLoginValue(newLogin) {
    this.setState({
        ...this.getState(),
        loginValue: newLogin
    });
  }

  setPasswordValue(newPassword) {
    this.setState({
        ...this.getState(),
        passwordValue: newPassword
    });
  }

  authChecking() {
    const isInStorage = Boolean(localStorage.getItem("token"))

    this.setState({
      ...this.getState(),
      isLoggedIn: isInStorage,
      profileInfo: {
        ...this.getState().profileInfo,
        name: localStorage.getItem("name")
      }
    });

    return isInStorage

  }


  async getProfileInfo() {

    this.setState({
      ...this.getState(),
      waiting: true
    });

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`/api/v1/users/self`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          "X-Token": token
        },
      });
      const json = await response.json();

      console.log(json)

      if (json.error) {
        throw new Error(json.error.message)
      }

      this.setState({
        ...this.getState(),
        profileInfo: {
          name: json.result.profile.name,
          phone: json.result.profile.phone,
          email: json.result.email
        },
        waiting: false
      });

    } catch (e) {

      console.log(e.message)
      this.setState({
        ...this.getState(),
        waiting: false
      });

    }

  }


  async SignIn(login, password) {

    this.setState({
      ...this.getState(),
      serverError: "",
      waiting: true
    });

    try {
      const response = await fetch(`/api/v1//users/sign`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({login, password})
      });
      const json = await response.json();

      if (json.error) {
        throw new Error(json.error.message)
      } else {
        localStorage.setItem("token", json.result.token)
        localStorage.setItem("name", json.result.user.profile.name)
      }

      this.setState({
        ...this.getState(),
        loginValue: "",
        passwordValue: "",
        isLoggedIn: true,
        waiting: false
      });

      return true

    } catch (e) {

      this.setState({
        ...this.getState(),
        isLoggedIn: false,
        serverError: e.message,
        waiting: false
      });

      return false
    }
  }

  async SignOut() {

    this.setState({
      ...this.getState(),
      waiting: true
    });

    const token = localStorage.getItem("token")

    try {
      const response = await fetch(`/api/v1//users/sign`, {
        method: "DELETE",
        headers: {
          "X-Token": token,
          'Content-Type': 'application/json'
        }
      });
      const json = await response.json();

      if (json.error) {
        throw new Error(json.error.message)
      } else {
        localStorage.removeItem("token")
        localStorage.removeItem("name")
      }

      this.setState({
        ...this.getState(),
        isLoggedIn: false,
        waiting: false
      });

      return true

    } catch (e) {

      this.setState({
        ...this.getState(),
        waiting: false
      });

      return false
    }
  }
}




export default AuthState;

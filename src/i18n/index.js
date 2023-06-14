import translate from "./translate";

class I18nService {

    constructor(services, config = {}) {
      this.services = services;
      this.config = config;
      this.lang = "en";
    }

    t = (text, number) => { 
        return translate(this.lang, text, number)
    }

    setLang = (newLang) => {
      this.lang = newLang

      console.log(this)
    }

}
  
  export default I18nService;
  
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: {
      "HOME": "Home",
      "NEW_POST": "New Post",
      "NOT_FOUND": "The page you were looking for does not exist",
      "ADD_POST_TITLE": "Add title here",
      "TOPIC_HOUSE": "House",
      "TOPIC_AUTO": "Auto",
      "TOPIC_FINANCE": "Finance",
      "TOPIC_PICK": "Please select a topic",
      "GO_BACK": "Back",
      "ADD_COMMENT": "Add Comment",
      "REPLY_NOW": "Reply Now",
      "CREATE_POST": "Create",
      "UPDATE_POST": "Update",
      "SEND": "Send",
      "MY_POSTS": "My Posts",
      "MY_COMMENTS": "My Comments",
      "LOG_IN": "Log in",
      "LOG_OUT": "Log out",
      "ACCOUNT": "Account",
      "SIGN_IN_REQUIRED": "Please sign in first",
      "NET_ERROR": "Network Connection Failed",
      "NET_BAD_REQUEST": "Please check your request",
      "NET_INTERNAL_ERROR": "Looks like something went wrong, please try again",
      "NET_NOT_ALLOW": "You do not have access to this resource",
      "NET_SUCCESS": "Operation success",
      "NET_UNKNOWN": "Unknow network error",
      "REPLIED": "Replied",
      "WITH": "with",
      "DELETED": "This comment has been deleted",
      "REDIRECT_URL": "/account",
      "URL_NOT_FOUND": "Url not found",
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
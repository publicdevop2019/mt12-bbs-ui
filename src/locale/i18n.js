import i18n from "i18next";
import { initReactI18next } from "react-i18next";

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
      "END_OF_LIST": "~~ End Of List ~~",
    }
  },
  zhHans: {
    translation: {
      "HOME": "主页",
      "NEW_POST": "发贴",
      "NOT_FOUND": "没有找到这个网页哦",
      "ADD_POST_TITLE": "请添加标题",
      "TOPIC_HOUSE": "住房",
      "TOPIC_AUTO": "汽车",
      "TOPIC_FINANCE": "金融",
      "TOPIC_PICK": "请选择一个主题",
      "GO_BACK": "返回",
      "ADD_COMMENT": "添加评论",
      "REPLY_NOW": "回复",
      "CREATE_POST": "创建",
      "UPDATE_POST": "更新",
      "SEND": "发送",
      "MY_POSTS": "我的帖子",
      "MY_COMMENTS": "我的评论",
      "LOG_IN": "登入",
      "LOG_OUT": "登出",
      "ACCOUNT": "账户",
      "SIGN_IN_REQUIRED": "请先登录",
      "NET_ERROR": "网络异常",
      "NET_BAD_REQUEST": "请检查你的请求",
      "NET_INTERNAL_ERROR": "似乎出了什么问题，请重试..",
      "NET_NOT_ALLOW": "没有权限",
      "NET_SUCCESS": "操作成功",
      "NET_UNKNOWN": "未知的网络错误",
      "REPLIED": "回复了",
      "WITH": "：",
      "DELETED": "该评论已被删除",
      "REDIRECT_URL": "/account",
      "URL_NOT_FOUND": "资源未找到",
      "END_OF_LIST": "~~ 到底喽 ~~",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: process.env.REACT_APP_LOCALE, // en | zhHans

    keySeparator: false,

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
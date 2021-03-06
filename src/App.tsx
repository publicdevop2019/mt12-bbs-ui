import { EditOutlined, ReadOutlined, SettingOutlined } from '@ant-design/icons';
import { message, Spin } from 'antd';
import axios from 'axios';
import i18n from 'i18next';
import moment from 'moment';
import React, { Component, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Link, Redirect, Route, Switch } from "react-router-dom";
import './App.scss';
import ProgressBar from './app/components/network-progress/network-progress';
import { PrivateRoute } from './app/components/private-route';
import { AuthContext } from './app/context/auth.context';
import { ThemeContext } from './app/context/theme.context';
import HomePage from './app/pages/home';
import NotFound from './app/pages/not-found';
import ViewPost from './app/pages/view-post';
import './locale/i18n';
const NewPost = lazy(() => import('./app/pages/new-post'));
const MyPosts = lazy(() => import('./app/pages/my-posts'));
const MyComments = lazy(() => import('./app/pages/my-comments'));
const Account = lazy(() => import('./app/pages/account'));


interface IState {
  jwt: string,
  theme: string,
  httpInProgress: boolean,
  menu: string,
}
export class App extends Component<any, IState>{
  private httpCount = 0;
  constructor(props: any) {
    super(props);
    this.state = {
      jwt: localStorage.getItem('jwt') || '',
      theme: localStorage.getItem('theme') || 'light',
      menu: window.location.pathname.replace('/', ''),
      httpInProgress: false
    }
    this.configAxios();
    this.configMomentJs();
  }
  updateJwt(next: string) {
    this.setState({ jwt: next });
    localStorage.setItem('jwt', next);
  }
  updateTheme(next: string) {
    this.setState({ theme: next });
    localStorage.setItem('theme', next);
  }
  clearJwt() {
    this.setState({ jwt: '' });
    localStorage.removeItem('jwt')
  }
  render() {
    return (
      <div className={this.state.theme === 'dark' ? 'dark-theme' : undefined} style={{ minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
        <ThemeContext.Provider value={{ theme: this.state.theme, updateTheme: (next) => { this.updateTheme(next) } }}>
          <AuthContext.Provider value={{ jwt: this.state.jwt, clearJwt: () => { this.clearJwt() }, updateJwt: (next) => { this.updateJwt(next) } }}>
            <Router>
              {this.state.httpInProgress ? <ProgressBar /> : null}
              <div style={{ display: 'flex', flexDirection: 'row', fontSize: '14px', lineHeight: '46px', justifyContent: 'space-around' }}>
                <Link to="/home"> <div onClick={() => { this.setState({ menu: 'home' }) }} className={this.state.menu === 'home' ? 'menu-selected' : 'menu-selected-not'} style={{ padding: '0px 8px' }}>
                  <span><ReadOutlined style={{ paddingRight: '8px' }} /></span><span>{i18n.t('HOME')}</span></div></Link>
                <Link to="/newPost"> <div onClick={() => { this.setState({ menu: 'newPost' }) }} className={this.state.menu === 'newPost' ? 'menu-selected' : 'menu-selected-not'} style={{ padding: '0px 8px' }}>
                  <span><EditOutlined style={{ paddingRight: '8px' }} /></span><span>{i18n.t('NEW_POST')}</span></div></Link>
                <Link to="/account"> <div onClick={() => { this.setState({ menu: 'account' }) }} className={this.state.menu === 'account' ? 'menu-selected' : 'menu-selected-not'} style={{ padding: '0px 8px' }}>
                  <span><SettingOutlined style={{ paddingRight: '8px' }} /></span><span>{i18n.t('ACCOUNT')}</span></div></Link>
              </div>
              <Suspense fallback={<div className="spinner"><Spin /></div>}>
                <Switch>
                  <Route path="/home">
                    <HomePage />
                  </Route>
                  <Route path="/post/*" component={ViewPost} />
                  {/* lazy load */}
                  <PrivateRoute jwt={this.state.jwt} path="/newPost" updateMenuToAccount={() => this.setState({ menu: 'account' })} render={(props) => <NewPost {...props} />} />
                  <PrivateRoute jwt={this.state.jwt} path="/edit/:postId" updateMenuToAccount={() => this.setState({ menu: 'account' })} render={(props) => <NewPost update={true} {...props} />} />
                  <PrivateRoute jwt={this.state.jwt} path="/account/posts" updateMenuToAccount={() => this.setState({ menu: 'account' })} render={() => <MyPosts />} />
                  <PrivateRoute jwt={this.state.jwt} path="/account/comments" updateMenuToAccount={() => this.setState({ menu: 'account' })} render={() => <MyComments />} />
                  <Route exact path="/account" component={Account} />
                  {/* lazy load */}
                  <Route exact path="/">
                    <Redirect
                      to={{
                        pathname: "/home",
                      }}
                    />
                  </Route>
                  <Route path="*">
                    <NotFound />
                  </Route>
                </Switch>
              </Suspense>
            </Router>
          </AuthContext.Provider>
        </ThemeContext.Provider>
      </div>
    );
  }
  private configAxios() {
    axios.interceptors.request.use((config) => {
      this.httpCount++;
      this.setState({ httpInProgress: true });
      if (config.url && config.url.indexOf('private') > -1) {
        config.headers = { ...config.headers, Authorization: `Bearer ` + this.state.jwt }
      }
      else if (config.url && config.method && config.url.indexOf('files') > -1 && config.method.toUpperCase() === 'POST') {
        config.headers = { ...config.headers, Authorization: `Bearer ` + this.state.jwt }
      }
      return config;
    }, function (error) {
      return Promise.reject(error);
    });
    axios.interceptors.response.use((response) => {
      this.httpCount--;
      if (this.httpCount === 0)
        this.setState({ httpInProgress: false });
      return response;
    }, (error) => {
      this.httpCount--;
      if (this.httpCount === 0)
        this.setState({ httpInProgress: false });
      if (error.request.status === 400) {
        if ((error.config.url as string).indexOf('/likes') === -1 && (error.config.url as string).indexOf('/dislikes') === -1)
          message.warn(i18n.t('NET_BAD_REQUEST'))
      } else if (error.request.status === 500 || error.request.status === 503) {
        message.warn(i18n.t('NET_INTERNAL_ERROR'))
      } else if (error.request.status === 0) {
        message.warn(i18n.t('NET_ERROR'))
      } else if (error.request.status === 403) {
        message.warn(i18n.t('NET_NOT_ALLOW'))
      } else if (error.request.status === 404) {
        message.warn(i18n.t('URL_NOT_FOUND'))
      } else if (error.request.status === 401) {
        message.warn(i18n.t('SIGN_IN_REQUIRED'))
        this.clearJwt();
      } else {
        message.warn(i18n.t('NET_UNKNOWN'))
      }
      return Promise.reject(error);
    });
  }
  private configMomentJs() {
    if (i18n.language === 'zhHans')
      moment.locale('zhHans', {
        relativeTime: {
          future: '未来%s',
          past: '%s前',
          s: '不久',
          m: '一分钟',
          mm: '%d分钟',
          h: '小时',
          hh: '%d 小时',
          d: '天',
          dd: '%d天',
          M: '1月',
          MM: '%d 月',
          y: '1年',
          yy: '%d年'
        }
      });
  }
}
export default App;

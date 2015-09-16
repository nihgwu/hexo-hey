/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var AuthModule = _interopRequire(__webpack_require__(4));

	var LoginModule = _interopRequire(__webpack_require__(1));

	var SettingsModule = _interopRequire(__webpack_require__(2));

	var PostModule = _interopRequire(__webpack_require__(3));

	angular.module("hey", ["ngAnimate", "ngCookies", "ngMessages", "ngSanitize", "ngMaterial", "ui.router", "hc.marked", "ui.ace", "angularMoment", AuthModule.name, LoginModule.name, SettingsModule.name, PostModule.name]).run(function ($rootScope, $location, $timeout, $mdMedia, AuthService) {
	  $rootScope.$mdMedia = $mdMedia;

	  // Redirect to login if route requires auth and you're not logged in
	  $rootScope.$on("$stateChangeStart", function (event, next) {
	    if (next.noAuth) {
	      return;
	    }

	    if (!AuthService.isLogin) {
	      event.preventDefault();
	      $timeout(function () {
	        $location.path("/login");
	      }, 0);
	    }
	  });
	}).constant("Config", {
	  APIURL: "/api"
	}).config(function ($mdThemingProvider) {
	  $mdThemingProvider.theme("default").primaryPalette("blue").accentPalette("orange").warnPalette("deep-orange");
	}).config(function ($mdIconProvider) {
	  var icons = ["logo", "code", "pound", "gear-a", "plus", "log-out", "edit", "eye", "eye-disabled", "more", "close", "checkmark"];
	  icons.forEach(function (icon) {
	    $mdIconProvider.icon(icon, "assets/icons/" + icon + ".svg");
	  });
	}).config(function (markedProvider) {
	  markedProvider.setOptions({
	    gfm: true,
	    pedantic: false,
	    sanitize: false,
	    tables: true,
	    breaks: true,
	    smartLists: true,
	    smartypants: true
	  });
	}).config(function ($urlMatcherFactoryProvider, $locationProvider, $httpProvider, $urlRouterProvider) {
	  //$httpProvider.defaults.withCredentials = true;
	  //$urlMatcherFactoryProvider.strictMode(false);
	  //$locationProvider.html5Mode(true);

	  $httpProvider.interceptors.push("AuthInterceptor");

	  //$urlRouterProvider.otherwise('/posts');
	  $urlRouterProvider.otherwise(function ($injector) {
	    var $state = $injector.get("$state");
	    $state.go("post.list");
	  });
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var LoginCtrl = _interopRequire(__webpack_require__(5));

	var LoginModule = angular.module("hey.login", []).controller("LoginCtrl", LoginCtrl).config(function ($stateProvider) {
	  $stateProvider.state("login", {
	    url: "/login",
	    templateUrl: "app/login/login.html",
	    controller: "LoginCtrl",
	    controllerAs: "vm",
	    noAuth: true
	  });
	});

	module.exports = LoginModule;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var SettingsCtrl = _interopRequire(__webpack_require__(6));

	var SettingsService = _interopRequire(__webpack_require__(7));

	var SettingsModule = angular.module("hey.settings", []).controller("SettingsCtrl", SettingsCtrl).service("SettingsService", SettingsService).config(function ($stateProvider) {
	  $stateProvider.state("settings", {
	    url: "/settings",
	    parent: "root",
	    templateUrl: "app/settings/settings.html",
	    controller: "SettingsCtrl",
	    controllerAs: "vm"
	  });
	});

	module.exports = SettingsModule;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var LayoutModule = _interopRequire(__webpack_require__(8));

	var PostListModule = _interopRequire(__webpack_require__(9));

	var PostDetailModule = _interopRequire(__webpack_require__(10));

	var PostEditModule = _interopRequire(__webpack_require__(11));

	var PostCtrl = _interopRequire(__webpack_require__(12));

	var PostService = _interopRequire(__webpack_require__(13));

	var PostModule = angular.module("hey.post", ["ui.router", LayoutModule.name, PostListModule.name, PostDetailModule.name, PostEditModule.name]).controller("PostCtrl", PostCtrl).service("PostService", PostService).config(function ($stateProvider, $urlRouterProvider) {
	  $stateProvider.state("post", {
	    url: "/posts",
	    parent: "root",
	    abstract: true,
	    templateUrl: "app/post/post.html",
	    controller: "PostCtrl",
	    controllerAs: "post"
	  });

	  $urlRouterProvider.when("/posts/", "/posts");
	});

	module.exports = PostModule;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var AuthService = _interopRequire(__webpack_require__(14));

	var AuthInterceptor = _interopRequire(__webpack_require__(15));

	var AuthModule = angular.module("hey.auth", []).service("AuthService", AuthService).factory("AuthInterceptor", AuthInterceptor.Factory);

	module.exports = AuthModule;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	var LoginCtrl = (function () {
	  /** @ngInject */

	  function LoginCtrl($state, $mdToast, AuthService) {
	    _classCallCheck(this, LoginCtrl);

	    angular.extend(this, {
	      $state: $state, $mdToast: $mdToast, AuthService: AuthService
	    });
	    this.user = {};
	  }

	  _createClass(LoginCtrl, {
	    login: {
	      value: function login() {
	        var _this = this;

	        this.AuthService.login(this.user).then(function () {
	          _this.$state.go("post.list");
	        })["catch"](function (err) {
	          _this.$mdToast.show(_this.$mdToast.simple().content(err).hideDelay(3000));
	        });
	      }
	    }
	  });

	  return LoginCtrl;
	})();

	module.exports = LoginCtrl;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	var SettingsCtrl = (function () {
	  /** @ngInject */

	  function SettingsCtrl($state, $mdToast, SettingsService) {
	    var _this = this;

	    _classCallCheck(this, SettingsCtrl);

	    angular.extend(this, {
	      $state: $state, $mdToast: $mdToast, SettingsService: SettingsService
	    });

	    SettingsService.getConfig().then(function (data) {
	      _this.config = angular.extend({}, data);
	    });
	  }

	  _createClass(SettingsCtrl, {
	    updateConfig: {
	      value: function updateConfig() {
	        var _this = this;

	        this.SettingsService.updateConfig(this.config).then(function () {
	          _this.$mdToast.show(_this.$mdToast.simple().content("Theme config updated").hideDelay(3000));
	        });
	      }
	    },
	    themeConfigLoaded: {
	      value: function themeConfigLoaded(editor) {
	        editor.$blockScrolling = Infinity;
	        editor.getSession().setUseWorker(false);
	        editor.getSession().setUseWrapMode(true);
	        editor.setHighlightActiveLine(false);
	        editor.setShowPrintMargin(false);
	      }
	    },
	    hexoConfigLoaded: {
	      value: function hexoConfigLoaded(editor) {
	        editor.$blockScrolling = Infinity;
	        editor.getSession().setUseWorker(false);
	        editor.getSession().setUseWrapMode(true);
	        editor.setHighlightActiveLine(false);
	        editor.setShowPrintMargin(false);
	        editor.setReadOnly(true);
	      }
	    }
	  });

	  return SettingsCtrl;
	})();

	module.exports = SettingsCtrl;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	var SettingsService = (function () {
	  /** @ngInject */

	  function SettingsService($http, $q, Config) {
	    _classCallCheck(this, SettingsService);

	    angular.extend(this, {
	      $http: $http, $q: $q, Config: Config
	    });
	    this.config = {};
	  }

	  _createClass(SettingsService, {
	    getConfig: {
	      value: function getConfig() {
	        var _this = this;

	        if (this.config.hexoConfig) {
	          return this.$q.resolve(this.config);
	        }
	        return this.$http.get(this.Config.APIURL + "/config").then(function (res) {
	          _this.config = res.data;
	          return res.data;
	        });
	      }
	    },
	    updateConfig: {
	      value: function updateConfig(config) {
	        var _this = this;

	        return this.$http.post(this.Config.APIURL + "/config", config).then(function (res) {
	          _this.config = res.data;
	          return res.data;
	        });
	      }
	    }
	  });

	  return SettingsService;
	})();

	module.exports = SettingsService;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var AuthModule = _interopRequire(__webpack_require__(4));

	var HeaderCtrl = _interopRequire(__webpack_require__(16));

	var layoutModule = angular.module("hey.layout", ["ui.router", AuthModule.name]).controller("HeaderCtrl", HeaderCtrl).config(function ($stateProvider) {
	  $stateProvider.state({
	    name: "root",
	    url: "",
	    abstract: true,
	    views: {
	      "": {
	        templateUrl: "app/layout/layout.html" },
	      "header@root": {
	        templateUrl: "app/layout/header/header.html",
	        controller: "HeaderCtrl",
	        controllerAs: "header"
	      }
	    }
	  });
	});

	module.exports = layoutModule;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var PostListCtrl = _interopRequire(__webpack_require__(17));

	var PostListModule = angular.module("hey.post.list", ["ui.router"]).controller("PostListCtrl", PostListCtrl).config(function ($stateProvider, $urlRouterProvider) {
	  $stateProvider.state("post.list", {
	    url: "",
	    parent: "post",
	    templateUrl: "app/post/list/list.html",
	    controller: "PostListCtrl",
	    controllerAs: "list"
	  });

	  $urlRouterProvider.when("/posts/", "/posts");
	});

	module.exports = PostListModule;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var PostDetailCtrl = _interopRequire(__webpack_require__(18));

	var PostDetailModule = angular.module("hey.post.detail", []).controller("PostDetailCtrl", PostDetailCtrl).config(function ($stateProvider) {
	  $stateProvider.state("post.detail", {
	    url: "/:slug",
	    parent: "post.list",
	    templateUrl: "app/post/detail/detail.html",
	    controller: "PostDetailCtrl",
	    controllerAs: "detail"
	  });
	});

	module.exports = PostDetailModule;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var PostEditCtrl = _interopRequire(__webpack_require__(19));

	var PostEditModule = angular.module("hey.post.edit", []).controller("PostEditCtrl", PostEditCtrl).config(function ($stateProvider) {
	  $stateProvider.state("post.create", {
	    url: "/create/new",
	    parent: "post",
	    templateUrl: "app/post/edit/edit.html",
	    controller: "PostEditCtrl",
	    controllerAs: "vm"
	  }).state("post.edit", {
	    url: "/:slug/edit",
	    parent: "post",
	    templateUrl: "app/post/edit/edit.html",
	    controller: "PostEditCtrl",
	    controllerAs: "vm"
	  });
	});

	module.exports = PostEditModule;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	var PostCtrl = (function () {
	  /** @ngInject */

	  function PostCtrl($state) {
	    _classCallCheck(this, PostCtrl);

	    this.$state = $state;
	  }

	  _createClass(PostCtrl, {
	    create: {
	      value: function create() {
	        this.$state.go("post.create");
	      }
	    },
	    aceLoaded: {
	      value: function aceLoaded(editor) {
	        editor.$blockScrolling = Infinity;
	        editor.getSession().setUseWorker(false);
	        editor.getSession().setUseWrapMode(true);
	        editor.setHighlightActiveLine(false);
	        editor.setShowPrintMargin(false);
	      }
	    }
	  });

	  return PostCtrl;
	})();

	module.exports = PostCtrl;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	var PostService = (function () {
	  /** @ngInject */

	  function PostService($http, $q, Config) {
	    _classCallCheck(this, PostService);

	    angular.extend(this, {
	      $http: $http, $q: $q, Config: Config
	    });

	    this.posts = [];
	    this.categories = [];
	    this.tags = [];
	  }

	  _createClass(PostService, {
	    getPosts: {
	      value: function getPosts() {
	        var _this = this;

	        if (this.posts.length) {
	          return this.$q.resolve(this.posts);
	        }
	        return this.$http.get(this.Config.APIURL + "/posts").then(function (res) {
	          _this.posts = res.data;
	          return res.data;
	        });
	      }
	    },
	    getPost: {
	      value: function getPost(slug) {
	        var _this = this;

	        var post = this.posts.find(function (post) {
	          return post.slug === slug;
	        });
	        if (post && !angular.isUndefined(post.content)) {
	          return this.$q.resolve(post);
	        }
	        return this.$http.get(this.Config.APIURL + "/posts/" + slug).then(function (res) {
	          var post = _this.posts.find(function (post) {
	            return post.slug === slug;
	          }) || {};
	          return Object.assign(post, res.data);
	        });
	      }
	    },
	    updatePost: {
	      value: function updatePost(post) {
	        var _this = this;

	        return this.$http.post(this.Config.APIURL + "/posts/", post).then(function (res) {
	          _this.posts = [];
	          _this.categories = [];
	          _this.tags = [];
	          return res.data;
	        });
	      }
	    },
	    deletePost: {
	      value: function deletePost(id) {
	        var _this = this;

	        return this.$http["delete"](this.Config.APIURL + "/posts/" + id).then(function (res) {
	          _this.posts = [];
	          _this.categories = [];
	          _this.tags = [];
	          return res.data;
	        });
	      }
	    },
	    getCategories: {
	      value: function getCategories() {
	        var _this = this;

	        if (this.categories.length) {
	          return this.$q.resolve(this.categories);
	        }
	        return this.$http.get(this.Config.APIURL + "/categories").then(function (res) {
	          _this.categories = res.data;
	          return res.data;
	        });
	      }
	    },
	    getTags: {
	      value: function getTags() {
	        var _this = this;

	        if (this.tags.length) {
	          return this.$q.resolve(this.tags);
	        }
	        return this.$http.get(this.Config.APIURL + "/tags").then(function (res) {
	          _this.tags = res.data;
	          return res.data;
	        });
	      }
	    }
	  });

	  return PostService;
	})();

	module.exports = PostService;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	var AuthService = (function () {
	  /** @ngInject */

	  function AuthService($state, $http, $q, $cookies, Config) {
	    _classCallCheck(this, AuthService);

	    angular.extend(this, {
	      $state: $state, $http: $http, $q: $q, $cookies: $cookies, Config: Config
	    });
	  }

	  _createClass(AuthService, {
	    isLogin: {
	      get: function () {
	        return !angular.isUndefined(this.$cookies.get("token"));
	      }
	    },
	    login: {
	      value: function login(user) {
	        var _this = this;

	        var deferred = this.$q.defer();
	        this.$http.post(this.Config.APIURL + "/login", {
	          name: user.name,
	          password: user.password
	        }).success(function (data) {
	          _this.$cookies.put("token", data.token);
	          deferred.resolve(data);
	        }).error(function (err) {
	          _this.logout();
	          deferred.reject(err);
	        });
	        return deferred.promise;
	      }
	    },
	    logout: {
	      value: function logout() {
	        this.$cookies.remove("token");
	        this.$state.go("login");
	      }
	    }
	  });

	  return AuthService;
	})();

	module.exports = AuthService;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	var that = undefined;

	var AuthInterceptor = (function () {
	  function AuthInterceptor($q, $cookies, $location, $timeout) {
	    _classCallCheck(this, AuthInterceptor);

	    angular.extend(this, {
	      $q: $q, $cookies: $cookies, $location: $location, $timeout: $timeout
	    });
	    that = this;
	  }

	  _createClass(AuthInterceptor, {
	    request: {
	      value: function request(config) {
	        config.headers = config.headers || {};
	        if (that.$cookies.get("token")) {
	          config.headers.Authorization = "Bearer " + that.$cookies.get("token");
	        }
	        return config;
	      }
	    },
	    responseError: {
	      value: function responseError(response) {
	        if (response.status === 401) {
	          // remove any stale tokens
	          that.$cookies.remove("token");

	          // use timeout to perform location change
	          // in the next digest cycle
	          that.$timeout(function () {
	            that.$location.path("/login");
	          }, 0);

	          return that.$q.reject(response);
	        }
	        return that.$q.reject(response);
	      }
	    }
	  }, {
	    Factory: {

	      /** @ngInject */

	      value: function Factory($q, $cookies, $location, $timeout) {
	        return new AuthInterceptor($q, $cookies, $location, $timeout);
	      }
	    }
	  });

	  return AuthInterceptor;
	})();

	module.exports = AuthInterceptor;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	var HeaderCtrl = (function () {
	  /** @ngInject */

	  function HeaderCtrl($state, $mdSidenav, AuthService) {
	    _classCallCheck(this, HeaderCtrl);

	    angular.extend(this, {
	      $state: $state, $mdSidenav: $mdSidenav, AuthService: AuthService
	    });
	  }

	  _createClass(HeaderCtrl, {
	    logout: {
	      value: function logout() {
	        this.AuthService.logout();
	      }
	    },
	    openSidebar: {
	      value: function openSidebar() {
	        if (this.$state.is("post.edit")) {
	          return this.$state.go("post.detail", {
	            id: this.$state.params.id
	          });
	        } else if (this.$state.is("post.create") || this.$state.is("settings")) {
	          return this.$state.go("post.list");
	        }
	        return this.$mdSidenav("postsMenu").toggle();
	      }
	    }
	  });

	  return HeaderCtrl;
	})();

	module.exports = HeaderCtrl;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	var PostListCtrl = (function () {
	  /** @ngInject */

	  function PostListCtrl($state, $mdSidenav, PostService) {
	    var _this = this;

	    _classCallCheck(this, PostListCtrl);

	    angular.extend(this, {
	      $state: $state, $mdSidenav: $mdSidenav, PostService: PostService
	    });

	    PostService.getPosts().then(function (data) {
	      _this.posts = data;
	      if ($state.is("post.list") && _this.posts.length) {
	        $state.go("post.detail", {
	          slug: _this.posts[0].slug
	        });
	      }
	    });
	  }

	  _createClass(PostListCtrl, {
	    detail: {
	      value: function detail(post) {
	        this.$mdSidenav("postsMenu").close();
	        this.$state.go("post.detail", {
	          slug: post.slug
	        });
	      }
	    }
	  });

	  return PostListCtrl;
	})();

	module.exports = PostListCtrl;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	var PostDetailCtrl = (function () {
	  /** @ngInject */

	  function PostDetailCtrl($state, $stateParams, PostService) {
	    var _this = this;

	    _classCallCheck(this, PostDetailCtrl);

	    this.$state = $state;
	    this.slug = $stateParams.slug;

	    PostService.getPost(this.slug).then(function (data) {
	      return _this.post = data;
	    })["catch"](function () {
	      return _this.$state.go("post.list");
	    });
	  }

	  _createClass(PostDetailCtrl, {
	    edit: {
	      value: function edit() {
	        this.$state.go("post.edit", {
	          slug: this.post.slug
	        });
	      }
	    }
	  });

	  return PostDetailCtrl;
	})();

	module.exports = PostDetailCtrl;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	var PostEditCtrl = (function () {
	  /** @ngInject */

	  function PostEditCtrl($mdSidenav, $mdDialog, $state, $stateParams, $filter, PostService) {
	    var _this = this;

	    _classCallCheck(this, PostEditCtrl);

	    angular.extend(this, {
	      $mdSidenav: $mdSidenav, $mdDialog: $mdDialog, $state: $state, $stateParams: $stateParams, $filter: $filter, PostService: PostService
	    });

	    this.slug = $stateParams.slug;
	    this.searchText = null;
	    this.selectedItem = null;
	    this.navId = "settingsView";
	    if (!this.slug) {
	      this.post = {
	        title: "Untitled",
	        slug: "Untitled",
	        date: $filter("date")(new Date(), "yyyy-MM-dd HH:mm:ss"),
	        tags: [],
	        categories: []
	      };
	    } else {
	      PostService.getPost(this.slug).then(function (data) {
	        if (data.content.indexOf("\n") === 0) {
	          data.content = data.content.slice(1);
	        }
	        data.date = $filter("date")(data.date, "yyyy-MM-dd HH:mm:ss");
	        _this.post = Object.assign({}, data);
	      })["catch"](function () {
	        return _this.$state.go("post.list");
	      });
	    }
	    PostService.getCategories().then(function (data) {
	      return _this.categories = data;
	    });
	    PostService.getTags().then(function (data) {
	      return _this.tags = data;
	    });
	  }

	  _createClass(PostEditCtrl, {
	    update: {
	      value: function update(publish) {
	        var _this = this;

	        if (angular.isUndefined(publish)) {
	          this.post.layout = this.post.published ? "post" : "draft";
	        } else {
	          this.post.layout = publish ? "post" : "draft";
	        }
	        this.PostService.updatePost(this.post).then(function (data) {
	          _this.$state.go("post.detail", {
	            slug: data.slug
	          });
	        });
	      }
	    },
	    cancel: {
	      value: function cancel() {
	        this.$state.go("post.list");
	      }
	    },
	    remove: {
	      value: function remove(ev) {
	        var _this = this;

	        var confirm = this.$mdDialog.confirm().title("Delete post").content("Do you really want to delete this post?").ariaLabel("Delete post").ok("Delete").cancel("Cancel").targetEvent(ev);

	        this.$mdDialog.show(confirm).then(function () {
	          _this.PostService.deletePost(_this.post.id).then(function () {
	            _this.$state.go("post.list");
	          });
	        });
	      }
	    },
	    showSettings: {
	      value: function showSettings() {
	        this.$mdSidenav(this.navId).toggle().then(function () {});
	      }
	    },
	    closeSettings: {
	      value: function closeSettings() {
	        this.$mdSidenav(this.navId).close();
	      }
	    }
	  });

	  return PostEditCtrl;
	})();

	module.exports = PostEditCtrl;

/***/ }
/******/ ])
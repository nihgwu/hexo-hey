'use strict';

/** @ngInject */
function TranslateConfig($translateProvider) {
  $translateProvider.translations('en-GB', {
    'USERNAME': 'Username',
    'PASSWORD': 'Password',
    'LOGIN': 'Login',
    'LOGOUT': 'Logout',
    'POSTS': 'Posts',
    'SETTINGS': 'Settings',
    'NEW_POST': 'New post',
    'THEME_CONFIG': 'Theme config',
    'HEXO_CONFIG': 'Hexo config',
    'POST_SETTINGS': 'Post settings',
    'SLUG': 'Slug',
    'DATE': 'Date',
    'CATEGORY': 'Category',
    'TAG': 'Tag',
    'UPDATE': 'Update',
    'PUBLISH': 'Publish',
    'UNPUBLISH': 'Unpublish',
    'SAVE_DRAFT': 'Save draft',
    'CANCEL': 'Cancel',
    'DELETE': 'Delete',
    'DELETE_POST': 'Delete post',

    'PUBLISHED': 'Publised at',
    'DRAFT': 'Draft',

    'INPUT_USERNAME': 'Please input the username',
    'INPUT_PASSWORD': 'Please input the password',
    'INPUT_TITLE': 'Please input the title',
    'INPUT_SLUG': 'Please input the slug',
    'INPUT_SLUG_EXIST': 'Slug already exists',
    'INPUT_DATE': 'Should be in yyyy-MM-dd( HH:mm:ss) format',
    'INPUT_SEARCH': 'Filter by title, category or tag',

    'CONFIRM_DELETE_POST': 'Do you really want to delete this post?',

    'SUCCESS_THEME_CONFIG_UPDATE': 'Theme config updated',
    'SUCCESS_POST_DELETE': 'Post deleted',
    'SUCCESS_POST_UPDATE': 'Post updated',

    'ERROR_USER': 'Error username or password',
    'ERROR_THEME_CONFIG_UPDATE': 'Theme config update error',
    'ERROR_POST_UPDATE': 'Update post error',
    'ERROR_POST_DELETE': 'Delete post error'
  });

  $translateProvider.translations('zh-CN', {
    'USERNAME': '用户名',
    'PASSWORD': '密码',
    'LOGIN': '登录',
    'LOGOUT': '退出',
    'POSTS': '文章',
    'SETTINGS': '设置',
    'NEW_POST': '新建',
    'THEME_CONFIG': '主题设置',
    'HEXO_CONFIG': '博客设置',
    'POST_SETTINGS': '文章设置',
    'SLUG': '别名',
    'DATE': '时间',
    'CATEGORY': '分类',
    'TAG': '标签',
    'UPDATE': '更新',
    'PUBLISH': '发布',
    'UNPUBLISH': '取消发布',
    'SAVE_DRAFT': '存草稿',
    'CANCEL': '取消',
    'DELETE': '删除',
    'DELETE_POST': '删除文章',

    'PUBLISHED': '发布于',
    'DRAFT': '草稿',

    'INPUT_USERNAME': '请输入用户名',
    'INPUT_PASSWORD': '请输入密码',
    'INPUT_TITLE': '请输入标题',
    'INPUT_SLUG': '请输入别名',
    'INPUT_SLUG_EXIST': '别名已存在',
    'INPUT_DATE': '时间格式 yyyy-MM-dd( HH:mm:ss)',
    'INPUT_SEARCH': '根据标题、分类或标签过滤',

    'CONFIRM_DELETE_POST': '确定删除这篇文章？',

    'SUCCESS_THEME_CONFIG_UPDATE': '主题设置更新成功',
    'SUCCESS_POST_DELETE': '文章删除成功',
    'SUCCESS_POST_UPDATE': '文章更新成功',

    'ERROR_USER': '用户名或密码错误',
    'ERROR_THEME_CONFIG_UPDATE': '主题设置更新失败',
    'ERROR_POST_UPDATE': '更新文章失败',
    'ERROR_POST_DELETE': '删除文章失败'
  });

  $translateProvider.translations('ru', {
    'USERNAME': 'Логин',
    'PASSWORD': 'Пароль',
    'LOGIN': 'Войти',
    'LOGOUT': 'Выйти',
    'POSTS': 'Записи',
    'SETTINGS': 'Настройки',
    'NEW_POST': 'Добавить запись',
    'THEME_CONFIG': 'Настройки темы',
    'HEXO_CONFIG': 'Настройки Hexo',
    'POST_SETTINGS': 'Параметры записи',
    'SLUG': 'SEO URL',
    'DATE': 'Дата',
    'CATEGORY': 'Категория',
    'TAG': 'Тэги',
    'UPDATE': 'Обновить',
    'PUBLISH': 'Публикация',
    'UNPUBLISH': 'Скрыть',
    'SAVE_DRAFT': 'Сохранить',
    'CANCEL': 'Отмена',
    'DELETE': 'Удалить',
    'DELETE_POST': 'Удалить запись',

    'PUBLISHED': 'Опубликована',
    'DRAFT': 'Черновик',

    'INPUT_USERNAME': 'Укажите логин',
    'INPUT_PASSWORD': 'Введите пароль',
    'INPUT_TITLE': 'Напишите заголовок',
    'INPUT_SLUG': 'Укажите SEO URL',
    'INPUT_SLUG_EXIST': 'Такой SEO URL уже существует',
    'INPUT_DATE': 'Правильный формат даты yyyy-MM-dd( HH:mm:ss)',
    'INPUT_SEARCH': 'Филтр по заголовку, категории или тэгу',

    'CONFIRM_DELETE_POST': 'Вы уверены, что хотите удалить запись?',

    'SUCCESS_THEME_CONFIG_UPDATE': 'Настройки темы обновлены',
    'SUCCESS_POST_DELETE': 'Запись удалена',
    'SUCCESS_POST_UPDATE': 'Запись обновлена',

    'ERROR_USER': 'Неверный логин или пароль',
    'ERROR_THEME_CONFIG_UPDATE': 'Ошибка обновления темы',
    'ERROR_POST_UPDATE': 'Возникла ошибка при обновлении записи',
    'ERROR_POST_DELETE': 'Возникла ошибка при удалении записи'
  });

  $translateProvider.useSanitizeValueStrategy(null);
  $translateProvider.fallbackLanguage('en-GB');
  //$translateProvider.uniformLanguageTag('bcp47');
  //$translateProvider.determinePreferredLanguage();
}

export default TranslateConfig;

'use strict';

var path = require('path');
var _ = require('macaca-utils');
var xml2map = require('xml2map');
var base = require('../dingtalk/base');
var kaoqin = require('../dingtalk/kaoqin');
var qiandao = require('../dingtalk/qiandao');


var platform = process.env.platform || 'iOS';
platform = platform.toLowerCase();

var iOSOpts = {
  platformVersion: '9.3',
  deviceName: 'iPhone 5s',
  platformName: 'iOS',
  //bundleId: 'xudafeng.ios-app-bootstrap',
  app: path.join(__dirname, '..', 'app', `DingTalk-Release.ipa.zip`)
};

var androidOpts = {
  platformName: 'Android',
  package: 'com.alibaba.android.rimet',
  // activity: 'com.alibaba.android.rimet.biz.home.activity.HomeActivity',  //一般注释
  app: path.join(__dirname, '..', 'app', `danger-not-enhanced-10002068-dingtalk-2.12.1.1-debug.apk`)
};
var wd = require('webdriver-client')(_.merge({}, platform === 'ios' ? iOSOpts : androidOpts));

// override back for ios
wd.addPromiseChainMethod('customback', function() {
  if (platform === 'ios') {
    return this;
  }

  return this
    .back();
});

describe('dingtalk login', base(wd)); //调试时，可以手工登录，注释这行
describe('dingtalk kaoqin', kaoqin(wd));
// describe('dingtalk qiandao', qiandao(wd));

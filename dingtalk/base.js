var base = function(wd) {
  return function(){
    this.timeout(5 * 60 * 1000);

    var driver = wd.initPromiseChain();

    driver.loginBygongyuan = function(username, password) {
      return this
        .sleep(1000)
        .elementById('com.alibaba.android.rimet:id/et_phone_input')
        .sendKeys(username)
        .sleep(1000)
        .elementById('com.alibaba.android.rimet:id/et_pwd_login')
        .sendKeys(password)
        .sleep(1000)
        .waitForElementByName('登录')
        .click()
        .sleep(5000);
    };

    driver.configureHttp({
      timeout: 60000
    });

    before(function() {
      return driver
        .initDriver();
    });

    it('#1 should login success', function() {
      return driver
            .loginBygongyuan('13175132240', '8888')
            .sleep(1000)
            .takeScreenshot();
    });
  }
}
module.exports = base
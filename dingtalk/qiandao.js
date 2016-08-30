var qiandao = function(wd) {
  return function(){
    this.timeout(5 * 60 * 1000);

    var driver = wd.initPromiseChain();

    driver.configureHttp({
      timeout: 60000
    });

    before(function() {
      return driver
        .initDriver();
    });

    after(function() {
      return driver
        .sleep(1000)
        .quit();
    });

    it('#2 should go into work', function() {
      return driver
        .waitForElementByName('工作')
        .click()
        .sleep(5000)
        .takeScreenshot();
    });


    it('#3 should go into 考勤打卡', function() {
      return driver
        .elementByName('考勤打卡')
          //   .elementById('com.alibaba.android.rimet:id/oa_entry_title') // 默认点击第一个微应用
        .click()
        .sleep(5000)
        .takeScreenshot();
    });

    it('#4 should go into 考勤统计', function() {
      return driver
        .webview()
        .elementByXPathOrNull('//*[@id="app"]/div/div[1]/div/div[1]/div[2]') //点击“统计”
        .click()
        .native()
        .waitForElementByName('确认')
        .click()
        .sleep(5000)
        .takeScreenshot();
    });
  }
  

}
module.exports = qiandao
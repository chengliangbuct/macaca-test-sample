var expect = require('chai').expect;
var kaoqin = function(wd) {
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


    it('#1 should go into 考勤打卡', function() {
      return driver
        .waitForElementByName('工作')
        .click()
        .sleep(3000)
        .elementByName('考勤打卡')
        .click()
        .sleep(5000)
        .hasElementById('com.alibaba.android.rimet:id/btn_right_text')
        .then(res => {
          if(res){
            driver.elementById('com.alibaba.android.rimet:id/btn_right_text')
            .click();
          }
        })
        .sleep(500)
        .takeScreenshot();
        assert(driver.webview().hasElementByXPath('//*[@id="app"]/div/div[2]/ul/li[3]'));
    });

    it('#2 should finish 新建考勤组', function() {
      return driver
        .webview()
        .elementByXPathOrNull('//*[@id="app"]/div/div[2]/ul/li[3]') //点击“设置”
        .click()
        .sleep(2000)
        .elementByXPathOrNull('//*[@id="app"]/div/div[1]/div/div[1]/div[2]')//点击“新建考勤组”
        .click()
        .sleep(1000)
        .elementByXPathOrNull('//*[@id="app"]/div/div/div/div[1]/input')//找到“考勤组名称输入框”
        .sendKeys('测试')
        .elementByXPathOrNull('//*[@id="app"]/div/div/div/div[2]')//找到“参与考勤人员”
        .click()
        .native()
        .waitForElementByName('全选')//找到“全选”
        .click()
        .waitForElementById('com.alibaba.android.rimet:id/btn_ok')//找到“确定”
        .click()
        .sleep(2000)
        .hasElementByName('确定')//找到弹出框中的“确定”
        .then(res => {
          if(res){
            console.log(res + "dslkfsj");
            driver.elementByName('确定')
            .click();
          }
        })
        .sleep(1000)
        .webview()
        .swipe(200, 400, 200, 100, 10)
        .elementByXPathOrNull('//*[@id="app"]/div/div/div/div[4]/ul/li[3]')//找到“自由工时”
        .click()
        .elementByXPathOrNull('//*[@id="app"]/div/div/div/div[5]')//找到“下一步”
        .click()
        .webview()
        .elementByXPathOrNull('//*[@id="app"]/div/div/div/div[5]')//找到“保存”
        .click()
        .webview()
        .elementByXPathOrNull('/html/body/div[2]/div/div/div[2]/div[2]')//找到“立即生效”
        .click()
        .sleep(2000)
        .takeScreenshot();
        assert(false);
    });

    it.skip('#3 should finish 考勤修改规则——添加办公wifi', function() {
      return driver
        .webview()
        .elementByXPathOrNull('//*[@id="app"]/div/div[2]/ul/li[3]') //点击“设置”
        .click()
        .sleep(2000)
        .elementByXPathOrNull('//*[@id="app"]/div/div[1]/div/div[1]/ul/li[1]/div[3]/button[1]')
        .click()
        .sleep(1000)
        .webview()
        .elementByXPathOrNull('//*[@id="app"]/div/div/div/div[3]')//找到“添加办公wifi”
        .click()
        .sleep(2000)
        .elementByXPathOrNull('//*[@id="app"]/div/div/div/div[1]/ul/li[1]')//找到“第一个wifi”
        .click()
        .elementByXPathOrNull('//*[@id="app"]/div/div/div/div[2]')//找到“确定”
        .click()
        .elementByXPathOrNull('//*[@id="app"]/div/div/div/div[5]')//找到“保存”
        .click()
        .sleep(2000)
        .takeScreenshot();
    });

    it.skip('#4 should finish 考勤修改规则——添加办公地址', function() {
      return driver
        .webview()
        .elementByXPathOrNull('//*[@id="app"]/div/div[2]/ul/li[3]') //点击“设置”
        .click()
        .sleep(2000)
        .elementByXPathOrNull('//*[@id="app"]/div/div[1]/div/div[1]/ul/li[1]/div[3]/button[1]')
        .click()
        .sleep(1000)
        .webview()
        .elementByXPathOrNull('//*[@id="app"]/div/div/div/div[4]/div[2]')//找到“添加办公地址”
        .click()
        .sleep(2000)
        .native()
        .waitForElementByName('确定')//找到“确定”
        .click()
        .sleep(500)
        .webview()
        .elementByXPathOrNull('/html/body/div[1]/div/div/div[3]/div[2]')//找到h5 弹框中的“保存”
        .click()
        .elementByXPathOrNull('//*[@id="app"]/div/div/div/div[5]')//找到“保存”
        .click()
        .sleep(2000)
        .takeScreenshot()
        .then(function() {
          expect(driver.webview().hasElementByXPath('//*[@id="app"]/div/div[2]/ul/li[3]')).to.not.be.ok;
        });
    });

  }

}
module.exports = kaoqin
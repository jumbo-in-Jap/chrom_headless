const chromeLauncher = require('lighthouse/chrome-launcher/chrome-launcher');
const CDP = require('chrome-remote-interface');

async function launchChrome(headless = true) {
  const chrome = await chromeLauncher.launch({
    port: 9222,
    chromeFlags: [
      '--disable-gpu',
      '--enable-logging',
      headless ? '--headless' : '',
    ]
  });
  return chrome;
};

function onPageLoad(Runtime) {
  const js = "document.querySelector('title').textContent";

  // ページ内で JS の式を評価する。
  return Runtime.evaluate({expression: js}).then(result => {
    console.log('Title of page: ' + result.result.value);
  });
}

// chromeの起動を確認する
// http://localhost:9222/ で動く
launchChrome(true).then(launcher => {
	console.log("Launcher setup")
	// このプロセス上で自作のhtmlを起動する
	CDP(async protocol => {	 
	    // 使用する機能を有効化
    	console.log("run setup")
	    const {Page, Runtime} = protocol;
	    await Page.enable();
	    await Runtime.enable();
	    // 画面遷移
	    await Page.navigate({url: 'http://www.cyokodog.net/'});
	    
		Page.loadEventFired(() => {
			onPageLoad(Runtime).then(() => {
  			protocol.close();
  			// プロセスの終了
  			launcher.kill(); 
			});
		});
	 }).on('error', err => {
	   	throw Error('Cannot connect to Chrome:' + err);
	 });
});
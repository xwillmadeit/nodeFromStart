var request = require('request'),
    fs = require('fs'),
    cheerio = require('cheerio'),
    path = require('path'),
    URL_CNODE = 'http://www.tupianzj.com/mingxing/xiezhen/gaoyuanyuan/list_211_1.html'

/* 开爬 */
(function dataCollectorStartup() {
    dataRequest(URL_CNODE);
})();
/* 数据请求 */
function dataRequest(dataUrl) {
    request({
        url: dataUrl,
        method: 'GET'
    }, function(err, res, body) {
        if (err) {
            console.log(dataUrl)
            console.error('[ERROR]Collection' + err);
            return;
        }
        switch (dataUrl) {
            case URL_CNODE:
                dataParse(body);
                break;
        }
    });
}

function dataParse(body) {

    console.log(body);

    var $ = cheerio.load(body);

    console.log($('#main .item a img').length);
    $('#main .item a img').each(function(idx, element) {

        var $element = $(element);
        console.log($element);
        var imgsrc = $element.attr('src');
        var filename = parseUrlForFileName(imgsrc);  //生成文件名
        downloadImg(imgsrc,filename,function() {
            console.log(filename + ' done');
        });
        //result.push($element.attr('title'));
    });

    //writeToFile(result);
}

function writeToFile(result){
    fs.writeFile('test.txt', result,  function(err) {
       if (err) {
           return console.error(err);
       }else {
            console.log('写入成功');
       }
    });
}

function parseUrlForFileName(address) {
    var filename = path.basename(address);
    return filename;
}

function downloadImg(uri, filename, callback){
    request.head(uri, function(err, res, body){
    if (err) {
        console.log('err: '+ err);
        return false;
    }
    request(uri).pipe(fs.createWriteStream('./images/'+filename)).on('close', callback);  
    });
};




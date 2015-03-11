var express = require('express');
var router = express.Router();
var mongodbPool = require('../models/db.js')

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});
var list_everydaytask =[];
var list_system =[];
var list_ad = [];
var system = [];
var ad=[];
router.get('/showtasks',function(req,res){
    system.length = 0;
    ad.length = 0;
    var t;
    if(list_everydaytask.length!=0){
        mongodbPool.acquire(function (err, db) {
            if (err) {
                return res.json(400, err);
            }
            db.collection('notices', function (err, collection) {
                if (err) {
                    mongodbPool.release(db);
                    return res.json(401, err);
                }
                collection.find().toArray(function (err, docs) {
                    mongodbPool.release(db);
                    if (err) {
                        return res.json(402, err);
                    }
//                console.log(docs);

                    for (var i = 0; i < docs.length; i++) {
                        if (docs[i].advertisement.radioButton == 'SYSTEMINFO') {
                            system.push(docs[i]);

                        }
                        if (docs[i].advertisement.radioButton == 'AD') {
                            ad.push(docs[i]);
                        }
                    }
                    console.log("********"+list_system[0]);

                    return res.render('testWebpage',{'list':list_everydaytask,'selectsystem':system,'selectad':ad,'list_system':list_system,'list_ad':list_ad});
                });
            });
        });


    }else{
        setImmediate(timeCount);
        return  long();

    }

    function long(){
        var now = new Date();
//        console.log("----"+now);
        //在这里设置什么时间触发去数据库里查找每日任务的随机取出3条
        if(now.getHours() ==0 && now.getMinutes()==0 && now.getSeconds()==0){
            console.log('listeverytasks is have')
            setImmediate(timeCount);
        }
        t = setTimeout(long,1000);
    }
    function timeCount() {
        console.log('这里写的是从数据库里的数组里随机取3个内容加到任务列表里');
        mongodbPool.acquire(function(err,db){
            if(err){
                return res.json(400,err);
            }
            db.collection('everydayTask',function(err,collection){
                if(err){
                    mongodbPool.release(db);
                    return res.json(401,err);

                }
                collection.find().toArray(function(err,tasks){
                    mongodbPool.release(db);
                    if(err){
                        return res.json(402,err);
                    }
//                    console.log(tasks);

                    var Array = [];
                    var MuseArray = [];
                    var MollyArray = [];
                    var BlackArray = [];
                    var KingArray = [];
                    var KurmiArray = [];
                    var MuseArray = [];
                    var NightmareArray = [];
                    for(var i = 0;i<tasks.length;i++){
                        if( tasks[i].everydayTask.rolename =='Muse'){
                            MuseArray.push(tasks[i]);

                        }
                        if( tasks[i].everydayTask.rolename =='Molly'){
                            MollyArray.push(tasks[i]);

                        }
                        if( tasks[i].everydayTask.rolename =='Black'){
                            BlackArray.push(tasks[i]);

                        }
                        if( tasks[i].everydayTask.rolename =='King'){
                            KingArray.push(tasks[i]);

                        }

                        if( tasks[i].everydayTask.rolename =='Kurumi'){
                            KurmiArray.push(tasks[i]);

                        }
                        if( tasks[i].everydayTask.rolename =='Nightmare'){
                            NightmareArray.push(tasks[i]);

                        }

                    }
                    Array.push(MuseArray);
                    Array.push(MollyArray);
                    Array.push(BlackArray);
                    Array.push(KingArray);
                    Array.push(KurmiArray);
                    Array.push(NightmareArray);
                    var a, b,c;
                    do{
                        a = Math.floor(Math.random()*Array.length);
                        b = Math.floor(Math.random()*Array.length);
                        c = Math.floor(Math.random()*Array.length);
                    }while(a==b||b==c||a==c);
//                    console.log("---------"+Array[a][Math.floor(Math.random()*Array[a].length)].everydayTask.rolename);
//                    console.log("---------"+Array[b][Math.floor(Math.random()*Array[b].length)]);
//                    console.log("---------"+Array[c][Math.floor(Math.random()*Array[c].length)]);
                    list_everydaytask.length = 0;
                    list_everydaytask.push(Array[a][Math.floor(Math.random()*Array[a].length)]);
                    list_everydaytask.push(Array[b][Math.floor(Math.random()*Array[b].length)]);
                    list_everydaytask.push(Array[c][Math.floor(Math.random()*Array[c].length)]);
                    list_everydaytask.push(new Date());
//                    console.log(list_everydaytask);
//                    if(list_everydaytask.length !=0){
//                        return res.render('testWebpage',{'list':list_everydaytask});
//                    }

                });
            });

        });

    }


});

router.post('/addSystem',function(req,res){
    var index = req.body.systeminfo;
    console.log("----"+system[index]);
    list_system.push(system[index]);
    list_system.push(new Date());
    res.redirect('/showtasks');

});

router.post('/addAD',function (req,res){
    var index = req.body.advertisment;
    console.log("----"+ad[index]);
    list_ad.push(ad[index]);
    list_ad.push(new Date());
    res.redirect('/showtasks');
});
router.get('/delsystem',function(req,res){

    var index = req.query.i;
    var indexnext = index++;
    var a=[];
    list_system[index] = null;
    list_system[indexnext] = null;

    for(var i=0;i<list_system.length;i++){
        if(list_system[i]!=null){
            a.push(list_system[i]);
        }

    }
    list_system.length = 0;
    list_system = a;
    res.redirect('/showtasks');
});
router.get('/delad',function(req,res){
    var index = req.query.i;
    var indexnext = index++;
    var b =[];
    list_ad[index] = null;
    list_ad[indexnext] = null;
    for(var i=0;i<list_ad.length;i++){
        if(list_ad[i]!=null){
            b.push(list_ad[i]);
        }
    }
    list_ad.length =0;
    list_ad = b;
    res.redirect('/showtasks');

});
router.get('/clearSystem',function(req,res){
    list_system.length = 0;
    res.redirect('/showtasks');

});

router.get('/clearAD',function(req,res){
    list_ad.length = 0;
    res.redirect('/showtasks');
});



router.get('/showtasksIOS',function(req,res){
    if(list_everydaytask.length!=0){
//       return res.send({'list':list_everydaytask,'list_system':list_system,'list_ad':list_ad});
       return res.json(200,{'list':list_everydaytask,'list_system':list_system,'list_ad':list_ad});
    }
//    res.send({'list':list_everydaytask,'list_system':list_system,'list_ad':list_ad});


});




module.exports = router;

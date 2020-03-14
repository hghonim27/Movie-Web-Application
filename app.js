var express = require('express');
var path = require('path');
var fs = require('fs');
var session=require('express-session');


var app = express();


// view engine setup
app.use(session({secret:'aboziad',saveUninitialized: true,resave: true}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//------------------------------------------------------------------------------------------------------------------------------
let loadTasks = function(){
  try {
      let bufferedData = fs.readFileSync('website.json')
      let dataString = bufferedData.toString()
      let tasksArray = JSON.parse(dataString)
      return tasksArray
  } catch (error) {
      return []
  }
 
}

let addTask = function(obj){
  //load tasks array
  let tasks = loadTasks()
  //push new task in array
  tasks.push({ username : obj.username, password : obj.password, watchlist : []})
  //save array back in file
  fs.writeFileSync('website.json', JSON.stringify(tasks))
}

app.get('/', function(req, res) {
  res.render('login', { title: 'Express' });
});
app.get('/registration', function(req, res) {
  res.render('registration', { title: 'Express' });
});

app.post('/',function(req, res){
  var users = loadTasks();
  var Index;
  var exu;
  var exp;
  for (let i = 0; i < users.length; i++) {
    if (req.body.username == users[i].username) {
      Index = i
      exu = true
    }
  }
  if(exu){
    if(users[Index].password == req.body.password){
      exp = true
    }
  }
 if(exu && exp){
   res.render('home')
 }else{
   res.send('Invalid Username/Password.')
 }
  });


app.post('/register', function (req, res) {
  let users = loadTasks()
  let ex;
  for (let i = 0; i < users.length; i++) {
    if (req.body.username == users[i].username) {
      ex = true
    }
  }
  if (ex) {
    res.status(400).send('Username is Already Exists')
  } else {
    addTask({ username: req.body.username, password: req.body.password });
    res.send('Registered Successfully');
  }
});

app.get('/drama', function(req, res) {
  res.render('drama', { title: 'Express' });
});
app.get('/horror', function(req, res) {
  res.render('horror', { title: 'Express' });
});
app.get('/action', function(req, res) {
  res.render('action', { title: 'Express' });
});

app.get('/godfather', function(req, res) {
  res.render('godfather', { title: 'Express' });
});
app.get('/godfather2', function(req, res) {
  res.render('godfather2', { title: 'Express' });
});
app.get('/scream', function(req, res) {
  res.render('scream', { title: 'Express' });
});
app.get('/conjuring', function(req, res) {
  res.render('conjuring', { title: 'Express' });
});
app.get('/darkknight', function(req, res) {
  res.render('darkknight', { title: 'Express' });
});
app.get('/fightclub', function(req, res) {
  res.render('fightclub', { title: 'Express' });
});

//------------------------------------------------------------
//-------------MyWatchlist------------------------------------
//------------------------------------------------------------

let loadTasks2 = function(){
  try {
      let bufferedData = fs.readFileSync('mywatchlist.json')
      let dataString = bufferedData.toString()
      let tasksArray = JSON.parse(dataString)
      return tasksArray
  } catch (error) {
      return []
  }
 
}

let addTask2 = function(m){
  //load tasks array
  let tasks = loadTasks2()
  //push new task in array
 tasks['Movies'].push(m)
  //save array back in file
  fs.writeFileSync('mywatchlist.json', JSON.stringify(tasks))
}

app.post('/godfather',function(req, res){
  var z = loadTasks2();
  var flag3=false;

  for(i=0;i<z['Movies'].length;i++){
    if("godfather"==z['Movies'][i]){
      res.send("movie is already in the Watchlist!");
      flag3=true;
      return;
    }
  }
  if(flag3==false){
    addTask2("godfather");
   }
   res.redirect('godfather');
});

app.post('/godfather2',function(req, res){
  var z = loadTasks2();
  var flag3=false;

  for(i=0;i<z['Movies'].length;i++){
    if("godfather2"==z['Movies'][i]){
      res.send("movie is already in the Watchlist!");
      flag3=true;
      return;
    }
  }
  if(flag3==false){
    addTask2("godfather2");
   }
   res.redirect('godfather2');
});

app.post('/scream',function(req, res){
  var z = loadTasks2();
  var flag3=false;

  for(i=0;i<z['Movies'].length;i++){
    if("scream"==z['Movies'][i]){
      res.send("movie is already in the Watchlist!");
      flag3=true;
      return;
    }
  }
  if(flag3==false){
    addTask2("scream");
   }
   res.redirect('scream');
});


app.post('/fightclub',function(req, res){
  var z = loadTasks2();
  var flag3=false;

  for(i=0;i<z['Movies'].length;i++){
    if("fightclub"==z['Movies'][i]){
      res.send("movie is already in the Watchlist!");
      flag3=true;
      return;
    }
  }
  if(flag3==false){
    addTask2("fightclub");
   }
   res.redirect('fightclub');
});


app.post('/darkknight',function(req, res){
  var z = loadTasks2();
  var flag3=false;

  for(i=0;i<z['Movies'].length;i++){
    if("darkknight"==z['Movies'][i]){
      res.send("movie is already in the Watchlist!");
      flag3=true;
      return;
    }
  }
  if(flag3==false){
    addTask2("darkknight");
   }
   res.redirect('darkknight');
});


app.post('/conjuring',function(req, res){
  var z = loadTasks2();
  var flag3=false;

  for(i=0;i<z['Movies'].length;i++){
    if("conjuring"==z['Movies'][i]){
      res.send("Movie is already in the Watchlist !!");
      flag3=true;
      return;
    }
  }
  if(flag3==false){
    addTask2("conjuring");
   }
   res.redirect('conjuring');
});

app.get('/watchlist', function(req,res){
    //console.log(tasks1);
    var tasks1 = loadTasks2();
    res.render('watchlist', {
       tasks: tasks1
    })
})

app.post('/watchlist', function(req,res){
    //console.log(req.body.task)
    var tasks1 = loadTasks2();
    tasks1.push(req.body.tasks)
    res.redirect('/watchlist')
})

//---------------------------------------------------
//----------------Search-----------------------------
//---------------------------------------------------

var films=["godfather","conjuring","darkknight","fightclub","godfather2","scream"];
var listsearchresults=[];

app.get('/searchresults',function(req,res){
res.render('searchresults', {
  listsearchresults2: listsearchresults
})
listsearchresults=[];
})



app.post('/search', function(req, res) {
  var x=req.body.Search;
  for(i=0;i<films.length;i++){
    if(films[i].includes(x)){
      listsearchresults.push(films[i])
      
    }
  }
  if(listsearchresults.length==0){
    listsearchresults.push("Movie not found");
  }
  listsearchresults.push(req.body.listsearchresults2);
  res.redirect('/searchresults');

});


app.listen(3000)
console.log("Server is running :)")


//-----------------------------------------------------------------------------------------------------------------------------
module.exports = app;


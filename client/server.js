const path = require('path');
const express=require('express');
const app=express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('dist'));

const fs=require('fs');




app.get('/strTest',function(req, res){
	res.sendFile(path.join(__dirname, 'dist/index.html'));

	/*fs.readFile( './index.html', 'utf8', (err, text) => {
		res.send(text);
	    });*/
	// res.render('index.html');
});

app.listen(3000);






function hello(str){
	console.log(str);
}

function initExample1(){
  const http=require('http');
  http.createServer(function(req,res){
    //res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('hello from node');
    res.write('\nhello from ');
    res.end();
  }).listen('3000');
}

function init(){
  const express=require('express');
  const app=express();
  app.get('/basePath',function(req, res,next){
    res.write("It's a path with next");
    next();
  });

  app.get('/basePath',function(req,res,next){
    var err="An error string";
    console.log(process.env);
    res.write("its a another path with ");
    next(err);
  })

  app.use('/basePath',function(err,req,res,next){
    res.write("\n"+err);
    res.end();
  });

  app.listen(3000);
}

//init();

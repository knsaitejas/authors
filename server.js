//modules to import 
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
//create an express app
var app = express();
//allow our app to use / set various technologies and folders
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
// app.set('views', path.join(__dirname, './views'));
// app.set('view engine', 'ejs');

app.use(express.static( __dirname + '/angularApp/dist' ));

mongoose.connect('mongodb://localhost/authors');

var authorsSchema = new mongoose.Schema({
	name: {type: String, minlength: 2},
	created_at: {type: Date, default: Date.now },
	updated_at: {type: Date, default: Date.now }
})

mongoose.model('Author', authorsSchema);
var Author = mongoose.model('Author')

mongoose.Promise = global.Promise;

app.get('/authors', function(req, res){
	Author.find({}, function(err, tasks){
		res.json(tasks)
	})
	
})

app.post('/authors', function(req, res){
	console.log(req.body)
	var authorInstance = new Author()
	authorInstance.name = req.body.name
	console.log(authorInstance.name)
	authorInstance.save(function(err){
		if(err){
			res.json({'error':err})
		} else {
			res.json({'message':'success'})
		}
	})
	
})

app.delete('/authors/:id', function(req, res){
	console.log('hiiii')
	Author.remove({_id: req.params.id}, function(err){
		if (err){
			res.json({'error':err})
		} else {
			res.json({'message': 'success'})
		}
	})
	
})

app.get('/authors/:id', function(req, res){
	Author.findOne({_id: req.params.id}, function(err, author){
		if (err){
			console.log(err)
		} else {
			res.json(author)
		}
	})
})

app.put('/authors/:id', function(req, res){
	Author.findOne({_id: req.params.id}, function(err, author){
	author.name = req.body.name
	author.save(function(err){
		if(err){
			res.json({'error': err})
		} else {
			res.json({'message': 'success'})
		}
	})
})
	
})

app.all("*", (req,res,next) => {
  res.sendFile(path.resolve("./public/dist/index.html"))
});

// app.get('/update/:id', function(req, res){
// 	Task.findOne({_id: req.params.id}, function(err, task){
// 		task.completed = true
// 		context = task
// 		task.save(function(err){
// 			if(err){
// 				console.log('not working: '+err)
// 			} else {
// 				console.log('it is working bro!!!')
// 			}
// 		})
// 	})
// 	res.json(context)
// })



// app.get('/delete/:id', function(req, res){
// 	Task.remove({_id: req.params.id}, function(err){
// 		if(err){
// 			console.log('not working: '+err)
// 		} else {
// 			console.log('it is working bro!!!')
// 		}
// 	})
// 	res.redirect('/')
// })

// app.get('/create/:title/:description', function(req, res){
// 	console.log('creating')
// 	var taskInstance = new Task()
// 	taskInstance.title = req.params.title
// 	taskInstance.description = req.params.description
// 	taskInstance.save(function(err){
// 		if(err){
// 			console.log('not working AND', er)
// 		} else {
// 			console.log('it is working')
// 		}
// 	})
// 	res.redirect('/')
// })

// app.get('/:id', function(req, res){
// 	Task.findOne({_id: req.params.id}, function(err, task){
// 		context = task
// 		res.json(context)
// 	})
// })








app.listen(8000, function() {
    console.log("listening on port 8000");
})




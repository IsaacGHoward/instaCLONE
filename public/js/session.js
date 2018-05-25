
let user;
function logoutClicked(){
//add or modify.  Do a get request on /logout and have the callback
//                from the server redirect to /login.

	return false;
}

function sessionSuccess(user){
	$('#username').html(user.username+"'s"+" profile");
	$('#name').html("Name: " + user.realname);
	$('#age').html("DOB: " + new Date(user.age));
	$('#datejoined').html("Date Joined: " + user.sd);

	let loc;
  var userposts = user.postObjects;
	userposts.sort(function(a, b) {
		return b.timestamp - a.timestamp;
	});
	console.log("/public/images/" + String("bison.jpg") +"");
	for (let i=0;userposts.length;i++) {
		loc = userposts[i].imageName;

	$('#postlist').append($('<img>',{src:'/public/images/' + String(loc)}));
	$('#postlist').append("<br>");
	$('#postlist').append(userposts[i].caption);
	$('#postlist').append("<br><br><br><hr><br><br><br>");
	}

	//$('#postlist').append(user.postObjects[0].image);


}
function postClicked()
{
	console.log(user);
	$.ajax({
					url: "/postPicture",
					type: "POST",
					data: {},
					success: function(data){

					if (!data)
							alert("Sign Up Invalid");
						else
						 window.location = data.redirect;
					} ,
					dataType: "json"
					});

			return false;
			}
	function getUserProfile()
			{
				console.log(user);
				$.ajax({
								url: "/getUserProfile",
								type: "GET",
								data: {username:user},
								success: function(data){

								if (!data)
										alert("Sign Up Invalid");
									else
									alert("Success")
									 window.location = data.redirect;
								} ,
								dataType: "json"
								});

						return false;
						}
	function getUsers()
	{

		console.log('getUsers function called');
		$.ajax({
						url: "/userList",
						type: "GET",
						success: function(data){
						console.log('get users success');
						if (!data)
								alert("No Users");
						else
						{
								for (let j=0;j<data.length;j++)
								{
									user = data[j];
									console.log(data[j]);
										$("#userList").append("<button> <a href='javaScript:getUserProfile()';>" +
										 											data[j] + "</a></button>");
								}
						}

						} ,
						dataType: "json"
						});

				return false;
				}


$(document).ready(function(){

	function userload()
	{
		var parameters = location.search.substring(1).split("&");

		var temp = parameters[0].split("=");
		l = unescape(temp[1]);

		temp = parameters[1].split("=");
		c = unescape(temp[1]);
		c= c.split('_').join(' ');
		l = l.split('_').join(' ');
		console.log(l);
		console.log(c);
		$("#postimage").attr("src",c);
		$("#posttitle").html(l);
		//document.getElementById("log").innerHTML = l;
		//document.getElementById("pass").innerHTML = c;
	}

	$.get('/userInfo',null,sessionSuccess);

//add or modify.  Do a get request on /userInfo to get user session data
//                about the currently logged in user.  Use that data to
//                modify the DOM to personalize the session.



	$("#allUsers").click( function( event ) {
				console.log('all users clicked');
				getUsers();
				return false;
					});



//add or modify.  Call logoutClicked when logout button is pressed.


});

// Full spec-compliant TodoMVC with localStorage persistence
// and hash-based routing in ~120 effective lines of JavaScript.

// localStorage persistence
var STORAGE_KEY = 'todos-vuejs-2.0'
var todoStorage = {
  fetch: function () {
    var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    todos.forEach(function (todo, index) {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save: function (todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}

// visibility filters
var filters = {
  all: function (todos) {
    return todos
  },
  active: function (todos) {
    return todos.filter(function (todo) {
      return !todo.completed
    })
  },
  completed: function (todos) {
    return todos.filter(function (todo) {
      return todo.completed
    })
  }
}

// app Vue instance
var app = new Vue({
  // app initial state
  data: {
    todos: todoStorage.fetch(),
    newTodo: '',
    editedTodo: null,
    visibility: 'all'
  },

  // watch todos change for localStorage persistence
  watch: {
    todos: {
      handler: function (todos) {
        todoStorage.save(todos)
      },
      deep: true
    }
  },

  // computed properties
  // http://vuejs.org/guide/computed.html
  computed: {
    filteredTodos: function () {
      return filters[this.visibility](this.todos)
    },
    remaining: function () {
      return filters.active(this.todos).length
    },
    allDone: {
      get: function () {
        return this.remaining === 0
      },
      set: function (value) {
        this.todos.forEach(function (todo) {
          todo.completed = value
        })
      }
    }
  },

  filters: {
    pluralize: function (n) {
      return n === 1 ? 'item' : 'items'
    }
  },

  // methods that implement data logic.
  // note there's no DOM manipulation here at all.
  methods: {
    addTodo: function () {
      var value = this.newTodo && this.newTodo.trim()
      if (!value) {
        return
      }
      this.todos.push({
        id: todoStorage.uid++,
        title: value,
        completed: false
      })
      this.newTodo = ''
    },

    removeTodo: function (todo) {
      this.todos.splice(this.todos.indexOf(todo), 1)
    },

    editTodo: function (todo) {
      this.beforeEditCache = todo.title
      this.editedTodo = todo
    },

    doneEdit: function (todo) {
      if (!this.editedTodo) {
        return
      }
      this.editedTodo = null
      todo.title = todo.title.trim()
      if (!todo.title) {
        this.removeTodo(todo)
      }
    },

    cancelEdit: function (todo) {
      this.editedTodo = null
      todo.title = this.beforeEditCache
    },

    removeCompleted: function () {
      this.todos = filters.active(this.todos)
    }
  },

  // a custom directive to wait for the DOM to be updated
  // before focusing on the input field.
  // http://vuejs.org/guide/custom-directive.html
  directives: {
    'todo-focus': function (el, binding) {
      if (binding.value) {
        el.focus()
      }
    }
  }
})

// handle routing
function onHashChange () {
  var visibility = window.location.hash.replace(/#\/?/, '')
  if (filters[visibility]) {
    app.visibility = visibility
  } else {
    window.location.hash = ''
    app.visibility = 'all'
  }
}

window.addEventListener('hashchange', onHashChange)
onHashChange()

// mount
app.$mount('.todoapp')


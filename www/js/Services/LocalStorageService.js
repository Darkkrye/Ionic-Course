var LocalStorageService = angular.module('LocalStorageService', [])

.service("LocalStorage", function() {
	this.KEY = "SavedTodos"

	this.save = function(todos) {
		localStorage.setItem(this.KEY, JSON.stringify(todos))
	}

	this.retrieve = function() {
		var todos = JSON.parse(localStorage.getItem(this.KEY))

		if (todos == null || todos.length < 1) {
			return []
		} else {
			return todos
		}
	}
})

// I don't have found any tuto or information on "How to create a storage service" so I have tried to do one by myself.
// I don't know if it's done good or not, but at least I have tried to.
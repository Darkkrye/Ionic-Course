angular.module('starter', ['ionic', 'LocalStorageService'])

/* Todo Controller declaration */
.controller("TodoCtrl", function($scope, $ionicPopup, $ionicListDelegate, LocalStorage) {
	/* VARIABLES */
	$scope.todos = LocalStorage.retrieve() /*[
		{ id: 0, title: "Test1", description: "Test1 Desc", done: true },
		{ id: 1, title: "Test2", description: "Test2 Desc", done: false },
		{ id: 2, title: "Test3", description: "Test3 Desc", done: true },
		{ id: 3, title: "Test4", description: "Test4 Desc", done: true },
		{ id: 4, title: "Test5", description: "Test5 Desc", done: false }
	]*/

	/* FUNCTIONS */

	// Add function
	$scope.addTodo = function() {
		// Create the default new todo
		$scope.newTodo = { id: $scope.todos.length, title: "", description: "", isDone: false }

		// Create the template
		var todoTemplate = '<input type="text" placeholder=" Titre" ng-model="newTodo.title" /> <br /> <textarea placeholder=" Description" ng-model="newTodo.description" rows="5" cols="15"></textarea>'

		$scope.showModal(todoTemplate, "Ajouter une tâche", "Ajouter", function() {
			// If the user does not give a title
			if(!$scope.newTodo.title) {
				e.preventDefault() // Prevent Default
			} else {
				$scope.todos.push($scope.newTodo) // Add the todo
				$scope.saveAndClose()
			}
		})

		// Create the popup
		/*var myPopup = $ionicPopup.show({
			template: todoTemplate,
			title: "Ajouter une tâche",
			scope: $scope,
			buttons: [
				{ text: 'Annuler' },
				{
					text: '<b>Ajouter</b>',
					type: 'button-positive',
					onTap: function(e) {
						// If the user does not give a title
						if(!$scope.newTodo.title) {
							e.preventDefault() // Prevent Default
						} else {
							$scope.todos.push($scope.newTodo) // Add the todo
							console.log($scope.todos)
							$scope.saveAndClose()
						}
					}
				}
			]
		})*/
	}

	// Edit function
	$scope.editTodo = function(todo) {
		// Set current todo
		$scope.editedTodo = todo

		// Create the template
		var updateTodoTemplate = '<input type="text" placeholder=" Titre" ng-model="editedTodo.title" /> <br /> <textarea placeholder=" Description" ng-model="editedTodo.description" rows="5" cols="15"></textarea>'

		$scope.showModal(updateTodoTemplate, "Modification de " + todo.title, "Modifier", function() {
			// If the user does not give a title
			if(!$scope.editedTodo.title) {
				e.preventDefault() // Prevent Default
			} else {
				$scope.todos[$scope.editedTodo-1] = $scope.editedTodo // Update the todo
				$scope.saveAndClose()
			}
		})

		// Create the popup
		/*var myPopup = $ionicPopup.show({
			template: updateTodoTemplate,
			title: "Modification de " + todo.title,
			scope: $scope,
			buttons: [
				{ text: 'Annuler' },
				{
					text: '<b>Modifier</b>',
					type: 'button-positive',
					onTap: function(e) {
						// If the user does not give a title
						if(!$scope.editedTodo.title) {
							e.preventDefault() // Prevent Default
						} else {
							$scope.todos[$scope.editedTodo-1] = $scope.editedTodo // Update the todo
							$scope.saveAndClose()

							// Big version
							/*for(var i = 0; i < $scope.todos.length; i++) {
								if($scope.todos[i].id === $scope.editedTodo.id) {
									$scope.todos[i] = $scope.editedTodo
								}
							}*/
						/*}
					}
				}
			]
		})*/
	}

	// Delete function
	$scope.deleteTodoById = function(id) {
		for (var i = 0; i < $scope.todos.length; i++) {
			if ($scope.todos[i].id === id) {
				$scope.todos.splice(i, 1) // Remove todo from array
				$scope.saveAndClose()
				return;
			}
		}
	}

	// Has Done function
	$scope.hasDone = function(id) {
		$scope.saveAndClose()
	}

	// Function to save todos and automatically 'swipe back' the todo item in the list
	$scope.saveAndClose = function() {
		LocalStorage.save($scope.todos) // Call the storage service
		$ionicListDelegate.closeOptionButtons() // Close buttons
	}

	// Function to create a modal window
	$scope.showModal = function(template, title, buttonTitle, callBack) {
		var myPopup = $ionicPopup.show({
			template: template,
			title: title,
			scope: $scope,
			buttons: [
				{ text: 'Annuler' },
				{
					text: '<b>' + buttonTitle + '</b>',
					type: 'button-positive',
					onTap: callBack
				}
			]
		})
	}
})
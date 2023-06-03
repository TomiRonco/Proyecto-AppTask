// Espera a que se cargue el contenido de la página
document.addEventListener('DOMContentLoaded', function () {
    // Obtén referencias a los elementos relevantes de la página
    var addTaskInput = document.getElementById('new-task');
    var addButton = document.getElementById('add-button');
    var incompleteTasks = document.getElementById('incomplete-tasks');
    var completedTasks = document.getElementById('completed-tasks');

    // Función para crear una nueva tarea
    function createNewTask(taskText) {
        var listItem = document.createElement('li');
        var checkbox = document.createElement('input');
        var label = document.createElement('label');
        var editInput = document.createElement('input');
        var editButton = document.createElement('button');
        var deleteButton = document.createElement('button');

        checkbox.type = 'checkbox';
        editInput.type = 'text';
        editButton.innerText = 'Editar';
        editButton.className = 'edit';
        deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
        deleteButton.className = 'delete';
        label.innerText = taskText;

        listItem.appendChild(checkbox);
        listItem.appendChild(label);
        listItem.appendChild(editInput);
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);

        return listItem;
    }

    // Función para agregar una nueva tarea
    function addTask() {
        var taskText = addTaskInput.value;
        if (taskText === '') {
            return;
        }

        var listItem = createNewTask(taskText);
        incompleteTasks.appendChild(listItem);
        bindTaskEvents(listItem, taskCompleted);

        addTaskInput.value = '';
    }

    // Función para editar una tarea existente
    function editTask() {
        var listItem = this.parentNode;
        var editInput = listItem.querySelector('input[type=text]');
        var label = listItem.querySelector('label');
        var containsClass = listItem.classList.contains('edit-mode');

        if (containsClass) {
            label.innerText = editInput.value;
        } else {
            editInput.value = label.innerText;
        }

        listItem.classList.toggle('edit-mode');
    }

    // Función para eliminar una tarea existente
    function deleteTask() {
        var listItem = this.parentNode;
        var ul = listItem.parentNode;
        ul.removeChild(listItem);
    }

    // Función para marcar una tarea como completada
    function taskCompleted() {
        var listItem = this.parentNode;
        completedTasks.appendChild(listItem);
        bindTaskEvents(listItem, taskIncomplete);
    }

    // Función para marcar una tarea como incompleta
    function taskIncomplete() {
        var listItem = this.parentNode;
        incompleteTasks.appendChild(listItem);
        bindTaskEvents(listItem, taskCompleted);
    }

    // Función para asignar eventos a los botones de una tarea
    function bindTaskEvents(listItem, checkboxEventHandler) {
        var checkbox = listItem.querySelector('input[type=checkbox]');
        var editButton = listItem.querySelector('button.edit');
        var deleteButton = listItem.querySelector('button.delete');

        editButton.onclick = editTask;
        deleteButton.onclick = deleteTask;
        checkbox.onchange = checkboxEventHandler;
    }

    // Asigna eventos a los botones existentes
    for (var i = 0; i < incompleteTasks.children.length; i++) {
        bindTaskEvents(incompleteTasks.children[i], taskCompleted);
    }

    for (var i = 0; i < completedTasks.children.length; i++) {
        bindTaskEvents(completedTasks.children[i], taskIncomplete);
    }

    // Agrega la funcionalidad al botón de agregar tarea
    addButton.onclick = addTask;
});

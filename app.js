/**
 * Datas
 * @type {Object}
 */
let datas = [
  {
    label: 'javascript',
    done: false,
  },
  {
    label: 'php',
    done: true,
  },
  {
    label: 'react',
    done: false,
  },
  {
    label: 'html',
    done: false,
  },
  {
    label: 'css',
    done: false,
  },
];


/**
 * Todolist
 */
const app = {
  /**
   * Chargement du DOM
   */
  init: function() {
    console.info('init');
    app.todo = document.getElementById('todo');
    app.todo.innerHTML = '';

    // Je crée mon formulaire
    app.createForm();

    // Je crée mon compteur
    app.createCount();

    // Je crée ma liste
    app.createList();
  },

  /**
   * Création du DOM du formulaire
   */
  createForm: function() {
    console.info('createForm');

    // <form>
    const form = document.createElement('form');
    form.id = 'todo-form';
    form.addEventListener('submit', app.addItem);

    // <input>
    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'todo-input';
    input.placeholder = 'Ajouter une tâche';
    input.autocomplete = 'off';

    // On sauvegarde la référence dans app
    // pour s'en servir plus tard (dans addItem)
    app.input = input;

    // On ajoute au DOM
    form.appendChild(input);
    app.todo.appendChild(form);
  },

  /**
   * Création du DOM du compteur
   */
  createCount: function() {
    console.info('createCount');

    // On compte le nombre de tâches
    const tasksUndone = datas.filter(data => !data.done);
    const count = tasksUndone.length;

    // On crée le compteur
    app.counterDOM = document.createElement('div');
    app.counterDOM.id = 'todo-counter';
    app.counterDOM.textContent = `${count} tâche(s) en cours`;

    // On ajoute du DOM
    app.todo.appendChild(app.counterDOM);
  },

  /**
   * Création du DOM de la liste
   */
  createList: function() {
    console.info('createList');

    // Je crée la liste
    app.list = document.createElement('ul');
    app.list.id = 'todo-list';

    // Je crée les items de la liste
    datas.forEach(app.generateItem);

    // On rajoute au DOM
    app.todo.appendChild(app.list);
  },

  /**
   * Rajoute un nouvel item dans la liste
   * @param {Object} data
   */
  generateItem: function(data) {
    console.info('generateItem');

    const item = document.createElement('li');
    item.className = 'todo';
    if (data.done) {
      item.classList.add('todo--done');
    }

    const check = document.createElement('input');
    check.type = 'checkbox';
    check.className = 'todo-check';
    check.checked = data.done;
    check.addEventListener('change', () => {
      data.done = !data.done;
      app.init();
    });

    const label = document.createElement('label');
    label.className = 'todo-label';
    label.textContent = data.label;

    // const cross = document.createElement('span');
    // cross.textContent = 'X';
    // cross.addEventListener('click', () => {
    //   // On filtre, pour supprimer l'objet
    //   datas = datas.filter(oldData => oldData !== data);
    //   app.init();
    // });
    // label.appendChild(cross);

    item.appendChild(check);
    item.appendChild(label);
    app.list.appendChild(item);
  },

  /**
   * J'ajoute une nouvelle tâche via le form
   */
  addItem: function(evt) {
    // On empêche le comportement par défaut
    evt.preventDefault();

    // Je récupère la valeur
    const value = app.input.value;

    // Je crée la tâche
    const task = {
      label: value,
      done: false,
    };

    // J'ajoute la tâche dans datas
    datas.push(task);

    // Je rends l'application à nouveau
    app.init();
  }
};


// Chargement du DOM
document.addEventListener('DOMContentLoaded', app.init);

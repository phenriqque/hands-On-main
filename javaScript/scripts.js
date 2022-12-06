// studentModal.open = true // funciona para abrir o dialog
// studentModal.open = false// funciona para fechar o dialog
// studentModal.setAttribute('open', true) // funciona para abrir o dialog
// studentModal.setAttribute('open', false) // não funciona para fechar o dialog
// studentModal.removeAttribute('open') funciona para fechar o dialog
// studentModal.showModal() // funciona para abrir o dialog
// studentModal.close() funciona para fechar o dialog

const studentModal = document.querySelector('#student-modal');
const studentForm = document.querySelector('#student-form');
const studentModalTitle = document.querySelector('#student-modal-title')
const saveStudentButton = document.querySelector('#save-student')

const DisciplinaModal = document.querySelector('#Disciplina-modal');
const DisciplinaForm = document.querySelector('#Disciplina-form');
const DisciplinaModalTitle = document.querySelector('#Disciplina-modal-title')
const saveDisciplinaButton = document.querySelector('#save-Disciplina')

/**
 * Função responsável abrir o modal de estudante
 */
const openStudentModal = () => studentModal.showModal();

/**
 * Função responsável abrir o modal de Disciplina
 */
const openDisciplinaModal = () => DisciplinaModal.showModal();

/**
 * Função responsável fechar o modal de estudante
 */
const closeStudentModal = () => studentModal.close();

/**
 * Função responsável fechar o modal de Disciplina
 */
 const closeDisciplinaModal = () => DisciplinaModal.close();

/**
 * Função responsável por criar linhas na tabela student-table
 * @param {nome} string
 * @param {matricula} string
 * @param {curso} string
 * @param {id} string
 */
const createStudentTableRow = (nome, matricula, curso, id) => {
  const studentTable = document.querySelector('#student-table tbody')
  const tableTr = document.createElement('tr');
  tableTr.innerHTML = ` 
  <td>${nome}</td>
  <td>${matricula}</td>
  <td>${curso}</td>
  <td align="center">
    <button class="button button--danger" onclick=deleteStudentTable(${id})>Apagar</button>
    <button class="button button--success" onclick="editdStudentModal(${id})">Editar</button>
  </td>`;
  studentTable.appendChild(tableTr);
}

/**
 * Função responsável por criar CARD da tabela disciplina
 * @param {nome} string
 * @param {cargaHoraria} string
 * @param {professor} string
 * @param {status} string
 * @param {observacos} string
 * @param {id} string
 */
 const createDisciplinasTableRow = (nomeDisc, cargaHoraria, professor, status, observacos, idDisc ) => {
 
  var st
  if(status=='Obrigatória'){
    st = "tag tag--danger"
  }else{ st = "tag tag--success"}

  const DisciplinasCards = document.querySelector('#Disciplinas-Cards')
  const cardsDiv = document.createElement('div');
  cardsDiv.innerHTML = `   
  <div class="subject-card">
    <h3 class="subject-card__title">${nomeDisc}</h3>
    <hr />
    <ul class="subject-card__list">
      <li>carga horária: ${cargaHoraria}</li>
      <li>Professor: ${professor}</li>
      <li>Status <span class="${st}">${status}</span></li>
    </ul>
    <p style="height: 15px">${observacos}</p>
    <div align="right" style="padding: 50px 0px 30px 0px" >
      <button class="button button--danger" onclick=deleteDisciplinaCard(${idDisc})>Apagar</button>
      <button class="button button--success" onclick="editdDisciplinaModal(${idDisc})">Editar</button>
    </div>
  </div>`;
  DisciplinasCards.appendChild(cardsDiv);
}


/**
 * Função responsável savar os dados de um estudante
 * @param {url} string
 * @param {method} string
 */
const saveStundentData = (url, method) => {
  studentForm.addEventListener('submit', (event)=> {
    event.preventDefault();
    const formData = new FormData(studentForm);
    const payload = new URLSearchParams(formData);
    fetch(url, {
        method: method,
        body: payload
    })
    alert('Aluno Salvo Com Sucesso.');
    closeStudentModal();
    location.reload();

    fetch.catch(error => {
        closeStudentModal();
        alert('ocorreu um erro tente mais tarde')
        console.error(error);
    })
    // const inputs = document.querySelectorAll('input') // pega todos os iputs
    // console.log(inputs[0].value) // acessa o primeiro indice do array de inputs
  });
}

/**
 * Função responsável savar os dados DAS DISCIPLINAS
 * @param {url} string
 * @param {method} string
 */
 const saveDisciplinaData = (url, method) => {
  DisciplinaForm.addEventListener('submit', (event)=> {
    event.preventDefault();
    const formData = new FormData(DisciplinaForm);
    const payload = new URLSearchParams(formData);
    fetch(url, {
        method: method,
        body: payload
    })
    alert('Disciplina Salva Com Sucesso.');
    closeDisciplinaModal();
    location.reload();

    fetch.catch(error => {
        closeDisciplinaModal();
        alert('ocorreu um erro tente mais tarde')
        console.error(error);
    })
    // const inputs = document.querySelectorAll('input') // pega todos os iputs
    // console.log(inputs[0].value) // acessa o primeiro indice do array de inputs
  });
}



/**
 * Função responsável abrir o modal de aluno e salvar um novo aluno
 * @param {studentId} string
 */
const createStudent = () => {
  openStudentModal();
  studentModalTitle.textContent = 'Novo Aluno';
  saveStudentButton.textContent = 'Criar';
  saveStundentData('http://localhost:3000/alunos',  'POST');
  }

  /**
 * Função responsável abrir o modal de aluno e salvar um novo aluno
 * @param {id} string
 */
const createDisciplina = () => {
  openDisciplinaModal();
  DisciplinaModalTitle.textContent = 'Nova Disciplina';
  saveDisciplinaButton.textContent = 'Criar';
  saveDisciplinaData('http://localhost:3000/disciplinas',  'POST');
  }


/**
 * Função responsável abrir o modal de edição e carregar os dados de um estudante e salvar os dados da edição
 * @param {studentId} string
 */
 const editdStudentModal = async (studentId)  => {
  const url = `http://localhost:3000/alunos/${studentId}`;
  openStudentModal();
  studentModalTitle.textContent='Editar aluno';
  saveStudentButton.textContent = 'Editar';
  const [name, matricula] = document.querySelectorAll('input');
  const selectCurso =  document.querySelector("#curso");
  fetch(url)
  .then(resp => resp.json())
  .then(data => {
    name.value = data.nome
    matricula.value = data.matricula
    selectCurso.value =  data.curso
  })
  saveStundentData(url,  'PUT');
 };

 /**
 * Função responsável abrir o modal de edição e carregar os dados de uma disciplina e salvar os dados da edição
 * @param {id} string
 */
  const editdDisciplinaModal = async (id)  => {
    const url = `http://localhost:3000/disciplinas/${id}`;
    openDisciplinaModal();
    DisciplinaModalTitle.textContent='Editar aluno';
    saveDisciplinaButton.textContent = 'Editar';
    const [nomeDisciplina, cargaHoraria, professor] = document.querySelectorAll('#nomeDisciplina, #cargaHoraria, #professor');
    const status =  document.querySelector("#status");
    const observacos =  document.querySelector("#observacos");
    fetch(url)
    .then(resp => resp.json())
    .then(data => {
      nomeDisciplina.value = data.nomeDisciplina
      cargaHoraria.value = data.cargaHoraria
      professor.value = data.professor
      observacos.value = data.observacos
      status.value =  data.status
    })
    saveDisciplinaData(url,  'PUT');
   };

/**
 * Função responsável por apagar dados de um estutande
 * @param {studentId} string
 */
const deleteStudentTable = async (studentId)  =>  {

  if (confirm("Tem Certeza Que Deseja Deletar Aluno?") == true) {
    fetch(`http://localhost:3000/alunos/${studentId}`, {method : 'DELETE'});
    alert('Deletado Com Sucesso.');
    location.reload();
  }
}

/**
 * Função responsável por apagar disciplina
 * @param {idDisc} string
 */
 const deleteDisciplinaCard = async (idDisc)  =>  {

  if (confirm("Tem Certeza Que Deseja Deletar Disciplina?") == true) {
    fetch(`http://localhost:3000/disciplinas/${idDisc}`, {method : 'DELETE'});
    alert('Deletado Com Sucesso.');
    location.reload();
  }
}
  
/**
 * Função responsável por carregar os dados da student-table
 */
const loadStudentTable = () => {
  fetch('http://localhost:3000/alunos')
  .then(resp => resp.json())
  .then(data => {
    data.forEach(item => {
      createStudentTableRow(item.nome, item.matricula, item.curso, item.id)
    })
  }).catch((error) => {
    alert('ocorreu um erro tente mais tarde')
    console.error(error);
  });
};

loadStudentTable();

/**
 * Função responsável por carregar os CARDS da TABELE DISCIPLNAS
 */
 const loadDisciplinasCards = () => {
  fetch('http://localhost:3000/disciplinas')
  .then(resp => resp.json())
  .then(data => {
    data.forEach(item => {
      createDisciplinasTableRow(item.nomeDisciplina, item.cargaHoraria, item.professor, item.status, item.observacos, item.id)
    })
  }).catch((error) => {
    alert('ocorreu um erro tente mais tarde')
    console.error(error);
  });
};

loadDisciplinasCards();





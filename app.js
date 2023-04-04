import { Renderer } from './renderer.js'
import { Student, StudentFromObject } from './student.js'
import { Api } from './api.js'

const renderer = new Renderer()
const api = new Api()


const content = document.querySelector('#content')
document.querySelector('#btn-add').addEventListener('click', addStudent)
document.querySelector('#btn-update').addEventListener('click', updateStudent)
document.querySelector('#btn-sort').addEventListener('click', sortStudents)

let students = await api.getAll()
render()


function render() {
    console.log(students)
    content.innerHTML = renderer.renderCards(students)

    document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', deleteStudent)
    })
    document.querySelectorAll('.btn-update').forEach(btn => {
        btn.addEventListener('click', updateLoad)
    })
}



function addStudent() {
    /*
    {
        "name": "VM-Köves Béla",
        "isActive": true,
        "birthYear": 2000,
        "connections": 10,
        "completedCredits": 30,
        "activeSemesterCount": 6,
        "image": "https://picsum.photos/200"
    }
    */

    const json = JSON.parse(document.querySelector('textarea').value)
    const student = StudentFromObject(json)

    api.add(student)
    .then(data => {
        console.log('Success: ', data)

        students.push(StudentFromObject(data))

        render()
    })
    .catch(error => {
        console.log('Error: ', error)
    })
}


function deleteStudent(e) {
    const id = e.target.dataset.id

    api.delete(id)
    .then(data => {
        console.log('Success: ', data)

        students = students.filter(x => x.id !== id)

        render()
    })
    .catch(error => {
        console.log('Error: ', error)
    })
}


function updateStudent() {
    const student = new Student(
        document.querySelector('#input-id').value,
        document.querySelector('#input-name').value,
        document.querySelector('#input-isactive').value === 'true',
        document.querySelector('#input-birthyear').value,
        document.querySelector('#input-connections').value,
        document.querySelector('#input-completedcredits').value,
        document.querySelector('#input-activesemestercount').value,
        document.querySelector('#input-image').value
    )

    api.update(student)
    .then(data => {
        console.log('Success: ', data)

        students = students.map(s => s.id === data.id ?
            StudentFromObject(data)
        : s)

        render()
    })
    .catch(error => {
        console.log('Error: ', error)
    })
}

function sortStudents() {
    const type = document.querySelector('select').value

    switch (type) {
        case 'true':
            students = students.filter(s => s.isActive)
            break

        case 'false':
            students = students.filter(s => !s.isActive)
            break

        case 'reset':
            api.getAll().then(data => students = data)
            break

        default: break
    }
    render()
}
function updateLoad(e) {
    const studentId = e.target.dataset.id
    const student = students.filter(s => s.id === studentId)[0]
    console.log(student)

    if (student) {
        document.querySelector('#input-id').value = student.id,
        document.querySelector('#input-name').value = student.name,
        document.querySelector('#input-isactive').value = student.isActive,
        document.querySelector('#input-birthyear').value = student.birthYear,
        document.querySelector('#input-connections').value = student.connections,
        document.querySelector('#input-completedcredits').value = student.completedCredits,
        document.querySelector('#input-activesemestercount').value = student.activeSemesterCount,
        document.querySelector('#input-image').value = student.image
    }
}

import { StudentFromObject } from './student.js'

export class Api {
    constructor() {
        this.baseURL = 'https://practiceapi.nikprog.hu/Student'
        this.headers = {
            "Content-Type": "application/json"
        }
    }

    getAll = async () => {
        const res = await fetch(this.baseURL)
        const data = await res.json()
        return data.map(i => StudentFromObject(i))
    }

    add = async student => {
        return fetch(this.baseURL, {
            method: 'post',
            headers: this.headers,
            body: JSON.stringify(student)
        }).then(res => res.json())
    }

    delete = async studentId => {
        return fetch(`${this.baseURL}/${studentId}`, {
            method: 'delete'
        }).then(res => res.json())
    }

    update = async student => {
        return fetch(this.baseURL, {
            method: 'put',
            headers: this.headers,
            body: JSON.stringify(student)
        }).then(res => res.json())
    }
}
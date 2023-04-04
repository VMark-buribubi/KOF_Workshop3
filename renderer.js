export class Renderer {

    renderCards = students => {
        let s = ''
        students.forEach(element => {
            s += `
            <div class="card ${element.isActive ? 'card-green' : 'card-red'}" style="width: 18rem;">
                <img src="${element.image}" class="card-img-top" alt="${element.name}'s image">
                <div class="card-body">
                    <h5 class="card-title">${element.name}</h5>
                    <p class="card-text">
                        <span>Birth year: ${element.birthYear}</span>
                        <span>Completed credits: ${element.completedCredits}</span>
                        <span>Semester count: ${element.activeSemesterCount}</span>
                        <span>connections: ${element.connections}</span>    
                    </p>
                    <a data-id="${element.id}" href="#" class="btn btn-danger btn-delete">Delete</a>
                    <a href="#" data-id="${element.id}" class="btn btn-primary btn-update">Update</a>
                </div>
            </div>
            `
        })
        return s
    }
}
export class Student {
    constructor(
        id, name, isActive, birthYear, connections,
        completedCredits, activeSemesterCount, image
    ) {
        this.id = id
        this.name = name
        this.isActive = isActive
        this.birthYear = birthYear
        this.connections = connections
        this.completedCredits = completedCredits
        this.activeSemesterCount = activeSemesterCount
        this.image = image
    }
}

export const StudentFromObject = object => new Student(
    object.id ? object.id : '',
    object.name,
    object.isActive,
    object.birthYear,
    object.connections,
    object.completedCredits,
    object.activeSemesterCount,
    object.image
)
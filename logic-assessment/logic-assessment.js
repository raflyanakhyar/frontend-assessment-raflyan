function countCharacterFrequency(text) {
    if (typeof text !== 'string') {
        return {}
    }

    const frequency = {}

    for (const char of text.toLowerCase()) {
        if (char >= 'a' && char <= 'z') {
            frequency[char] = (frequency[char] || 0) + 1
        }
    }

    return frequency
}

console.log(countCharacterFrequency('Hello World'))

function processUserData(users) {
    if (!Array.isArray(users)) {
        return {}
    }

    const adults = users.filter(
        (user) =>
            user != null &&
            typeof user.age === 'number' &&
            Number.isFinite(user.age) &&
            user.age >= 18,
    )

    const groups = {}

    for (const user of adults) {
        const genderKey =
            typeof user.gender === 'string' && user.gender.trim() !== '' ? user.gender : 'unknown'

        if (!groups[genderKey]) groups[genderKey] = []
        groups[genderKey].push(user)
    }

    const result = {}

    for (const genderKey of Object.keys(groups)) {
        const groupUsers = groups[genderKey]
        const totalAge = groupUsers.reduce((sum, user) => sum + user.age, 0)
        const averageAge = Math.round((totalAge / groupUsers.length) * 10) / 10

        result[genderKey] = { count: groupUsers.length, averageAge, users: groupUsers }
    }

    return result
}

console.log(
    processUserData([
        { id: 1, name: 'Budi', age: 23, gender: 'male' },
        { id: 2, name: 'Eraine', age: 20, gender: 'female' },
        { id: 3, name: 'Reja', age: 27, gender: 'male' },
    ]),
)

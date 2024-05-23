const tagsController = {
    getone: (data, id) => {
        return data.find(element => element.id == id)
    }
}

export { tagsController }
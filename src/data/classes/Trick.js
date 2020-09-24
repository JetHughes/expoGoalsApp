class Trick {
    constructor(name, type) {
        this.name = name;
        this.type = type;
        this.id = Date.now() + ( (Math.random()*100000).toFixed());    
    }
}

export default Trick;
import Utils from '../../Utils';

class Trick {
    constructor(name, type) {
        this.name = name;
        this.type = type;
        this.id = Utils.unique();    
    }
}

export default Trick;
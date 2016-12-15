function Debug(level) {

    this.print = function(str){
        console.log(str);
    };
    this.log = function(msg, priority){
        if(priority <= level){
            console.log(msg);
        }
    };
}

module.exports = Debug;
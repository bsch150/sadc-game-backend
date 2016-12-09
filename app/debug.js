var Debug = {
    debugging: true,
    print: function(str){
        if(this.debugging){
            console.log(str);
        }
    }
};

module.exports = Debug;
var utils = require("../lib/utils");
var seedRander = utils.UString.seedRandom;
var Srand = utils.UString.Srand;
var Rand = utils.UString.Rand;

var LOOP_MAX = 10;

{

    function testSeedRander ()
    {
        var init = seedRander() == seedRander() ? seedRander() : false;
        console.log("init value is " + init);

        if(init){
            var mesure = seedRander(init);
            var counter = 0;
            for(var index = 0; index < LOOP_MAX; index++){
                var newValue = seedRander(init);
                if(mesure != newValue){
                    console.log(index + " times cause differ: mesure[" + mesure +"] != newValue[" + newValue + "]");
                    counter ++;
                }
            }
            console.log("in %d times total [%d] time(s) invalid", LOOP_MAX, counter);
        }

    }
    testSeedRander();

}



{

	function testSrand(){
		var seed = parseInt(new Date().valueOf() / 1000);
		Srand(seed);
	}

	function testSeed(){
		var seedArr = [];
		for(var i = 0; i < 10; i++){
			seedArr.push(Rand());
		}
		console.log(seedArr);
	}

	testSrand();
	testSeed();

}
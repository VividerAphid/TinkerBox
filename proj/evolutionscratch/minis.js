function genericMFSim(){
    let mCount = 50;
    let fCount = 50;
    for(let r = 0; r < 100; r++){
        let nMCount = 0;
        let nFCount = 0;
        let reps = mCount;
        if(mCount > fCount){
            reps = fCount;
        }
        reps = reps*2;
        reps += Math.floor(Math.random()*(reps*.3));
        //console.log(reps);
        for(let t = 0; t < reps; t++){
            if(Math.random() > .49){
                nMCount++;
            }
            else{
                nFCount++;
            }
        }
        console.log("M: "+ mCount + "   F: "+fCount);
        mCount = nMCount;
        fCount = nFCount;
    }
}